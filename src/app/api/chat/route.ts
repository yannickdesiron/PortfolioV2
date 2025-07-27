import { NextRequest, NextResponse } from "next/server";
import { CohereEmbeddings } from "@langchain/cohere";
import { ChatCohere } from "@langchain/cohere";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import fs from "fs/promises";
import path from "path";

const knowledgeDir = path.join(process.cwd(), "data", "knowledge");

async function loadKnowledge() {
  const files = await fs.readdir(knowledgeDir);
  const docs: { content: string; source: string }[] = [];
  for (const file of files) {
    const filePath = path.join(knowledgeDir, file);
    const content = await fs.readFile(filePath, "utf8");
    docs.push({ content, source: file });
  }
  return docs;
}


export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const question = messages[messages.length - 1]?.content?.trim();
  if (!question) {
    return NextResponse.json({ reply: "No question provided." }, { status: 400 });
  }

  // Handle greetings and polite phrases
  const greetings = [
    /^(hi|hello|hey|good (morning|afternoon|evening)|greetings)[!. ]*$/i,
    /^thank(s| you)[!. ]*$/i,
    /^thanks[!. ]*$/i,
    /^yo[!. ]*$/i,
    /^sup[!. ]*$/i,
    /^how are you[?.! ]*$/i
  ];
  if (greetings.some((re) => re.test(question))) {
    let reply = "";
    if (/thank/i.test(question)) {
      reply = "You're welcome! If you have more questions, just ask.";
    } else if (/how are you/i.test(question)) {
      reply = "I'm just a virtual assistant, but I'm here and ready to help!";
    } else {
      reply = "Hello! How can I help you today?";
    }
    return NextResponse.json({ reply });
  }

  // Load and split knowledge
  const docs = await loadKnowledge();
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 50 });
  const allChunks: { content: string; source: string }[] = [];
  for (const doc of docs) {
    const splits = await splitter.splitText(doc.content);
    allChunks.push(...splits.map((chunk) => ({ content: chunk, source: doc.source })));
  }

  // Embed all chunks
  const embeddings = new CohereEmbeddings({ apiKey: process.env.COHERE_API_KEY, model: "embed-multilingual-v3.0" });
  const vectors = await embeddings.embedDocuments(allChunks.map((c) => c.content));

  // Embed the question
  const questionVector = await embeddings.embedQuery(question);

  // Find the most similar chunk (cosine similarity)
  function cosineSim(a: number[], b: number[]) {
    const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
    const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
    return dot / (normA * normB);
  }
  const similarities = vectors.map((vec) => cosineSim(vec, questionVector));
  const bestIdx = similarities.findIndex((sim) => sim === Math.max(...similarities));
  const bestChunk = allChunks[bestIdx];

  // Always use the LLM to answer, even for low similarity
  const context = bestChunk ? bestChunk.content : '';
  if (!context) {
    // If for some reason no context is found, fallback
    return NextResponse.json({ reply: "Sorry, I don't have an answer for that. Please contact me via the contact form or email." });
  }

  // Build chat history for context
  const chatHistory = messages
    .map((m: { role: string; content: string }) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');

  // Friendlier, more conversational and concise prompt
  const prompt = `You are Yannick's friendly portfolio AI assistant. Use the context below to answer the user's questions. Be conversational, helpful, and keep your answers short and to the point. If you don't know, politely suggest contacting Yannick. very brief.
  Never use placeholders. Always answer with specific details from the context. If possible try to answer in 1 or 2 sentences. \n\nContext:\n${context}\n\nChat history:\n${chatHistory}\n\nAssistant:`;

  const llm = new ChatCohere({ apiKey: process.env.COHERE_API_KEY });
  const answer = await llm.invoke(prompt);
  // Ensure reply is always a string
  let reply: string;
  if (typeof answer === 'string') {
    reply = answer;
  } else if (answer && typeof answer === 'object' && 'text' in answer && typeof answer.text === 'string') {
    reply = answer.text;
  } else {
    reply = 'Sorry, something went wrong.';
  }

  // Show contact button if fallback or contact phrase is present
  const contactPhrases = [
    'contact Yannick',
    'contact me',
    'contact form',
    'reach out',
    'email me',
    'get in touch'
  ];
  const showContactButton = contactPhrases.some(phrase => reply.toLowerCase().includes(phrase));

  return NextResponse.json({ reply, showContactButton });
}
