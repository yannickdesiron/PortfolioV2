"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi! I'm Yannick's AI assistant. Ask me anything!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user" as const, content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await res.json();
      if (res.ok) {
        setMessages([...newMessages, { role: "assistant" as const, content: data.reply }]);
      } else {
        setMessages([...newMessages, { role: "assistant" as const, content: "Sorry, something went wrong." }]);
      }
    } catch {
      setMessages([...newMessages, { role: "assistant" as const, content: "Sorry, something went wrong." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!open && (
          <Button
            className="h-16 w-16 p-0 flex items-center justify-center rounded-full bg-slate-500 dark:bg-slate-500 text-neutral-200 dark:text-neutral-200 shadow-lg transition-transform duration-200 ease-in-out animate-bounce hover:scale-110 hover:bg-slate-400 dark:hover:bg-slate-400"
            onClick={() => setOpen(true)}
            aria-label="Open chat"
          >
            <MessageCircle className="h-full w-full" />
          </Button>
        )}
        {open && (
          <div className="relative w-80 max-w-[90vw] min-h-[480px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden animate-in fade-in zoom-in
            max-sm:fixed max-sm:inset-0 max-sm:w-full max-sm:max-w-full max-sm:min-h-screen max-sm:rounded-none max-sm:z-50">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
              <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Chat with Yannick's AI</span>
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Messages */}
            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-white dark:bg-gray-900"
              aria-live="polite"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
            {/* Input */}
            <div className="flex flex-col">
              <form
                className="flex items-center gap-2 px-3 pt-3 pb-1 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800"
                onSubmit={e => { e.preventDefault(); sendMessage(); }}
              >
                <Input
                  ref={inputRef}
                  placeholder="Type your message..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <div className="px-3 pb-2 text-xs text-gray-400 dark:text-gray-500 text-center select-none">Powered by AI</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
