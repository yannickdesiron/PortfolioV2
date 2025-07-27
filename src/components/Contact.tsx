"use client";

import Link from "next/link";
import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export type ContactTranslations = {
  title: string;
  intro: string;
  emailLabel: string;
  email: string;
  linkedinLabel: string;
  linkedin: string;
  locationLabel: string;
  location: string;
  backToHome: string;
  formTitle: string;
  formName: string;
  formNamePlaceholder: string;
  formEmail: string;
  formEmailPlaceholder: string;
  formMessage: string;
  formMessagePlaceholder: string;
  formSubmit: string;
};

export default function Contact({ translations }: { translations: ContactTranslations }) {
  const [isVisible, setIsVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const isHuman = sliderValue === 100;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSliderValue(Number(e.target.value));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isHuman || loading) return;
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xpwplebo", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (res.ok) {
        toast.success("Message sent! Thank you for reaching out. I'll get back to you soon.");
        form.reset();
        setSliderValue(0);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 px-4 pt-4 pb-8">
      <div className={`w-full max-w-2xl flex flex-col gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}> 
        <div>
          <h1 className="text-5xl font-extrabold mb-2 text-gray-900 dark:text-gray-100 tracking-tight">Contact</h1>
          <p className="mb-6 text-gray-700 dark:text-gray-300 text-base">{translations.intro}</p>
          <div className="mb-4 flex items-center gap-4">
            <a href={`mailto:${translations.email}`} aria-label="Email">
              <Mail className="w-6 h-6 text-gray-900 dark:text-gray-100 hover:text-blue-500 transition-colors" />
            </a>
            <a href="https://linkedin.com/in/yannick" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6 text-gray-900 dark:text-gray-100 hover:text-blue-500 transition-colors" />
            </a>
            <a href="https://github.com/yannickdesiron" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-6 h-6 text-gray-900 dark:text-gray-100 hover:text-blue-500 transition-colors" />
            </a>
          </div>
        </div>
        <form
          className="flex flex-col gap-4 bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 shadow"
          onSubmit={handleSubmit}
        >
          {/* ...existing code... */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{translations.formTitle}</h2>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-gray-800 dark:text-gray-200">{translations.formName}</label>
            <input id="name" name="name" type="text" required placeholder={translations.formNamePlaceholder}
              className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium text-gray-800 dark:text-gray-200">{translations.formEmail}</label>
            <input id="email" name="email" type="email" required placeholder={translations.formEmailPlaceholder}
              className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="font-medium text-gray-800 dark:text-gray-200">{translations.formMessage}</label>
            <textarea id="message" name="message" required rows={5} placeholder={translations.formMessagePlaceholder}
              className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          {/* Slider verification (smaller, neutral color, between message and submit) */}
          <div className="flex flex-col gap-1 mt-2 mb-1">
            <label htmlFor="slider" className="font-medium text-gray-700 dark:text-gray-300 mb-1 text-sm">
              Slide to verify
            </label>
            <input
              id="slider"
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleSliderChange}
              className="w-32 h-2 accent-gray-400 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer"
              style={{ accentColor: '#a3a3a3' }}
            />
            <div className="text-xs mt-1 min-h-[1.5em]">
              {isHuman ? (
                <span className="text-green-600 font-medium">✔️ Verified as human</span>
              ) : (
                <span className="text-gray-500">Drag the slider all the way to the right</span>
              )}
            </div>
          </div>
          <Button type="submit" className="mt-2 w-fit self-end flex items-center gap-2" disabled={!isHuman || loading}>
            {loading && (
              <svg className="animate-spin h-4 w-4 mr-1 text-gray-600 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            )}
            {translations.formSubmit}
          </Button>
        </form>
        {/* Back to Home button removed as requested */}
      </div>
    </div>
  );
}
