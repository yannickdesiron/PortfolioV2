import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  title: string;
  name: string;
  subtitle: string;
  cta: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

export default function Hero({ title, name, subtitle, cta, buttonText, imageSrc, imageAlt }: HeroProps) {
  return (
    <section className="relative flex items-end w-full min-h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900">
      {/* Soft overlay for the entire section */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent dark:from-white/15 pointer-events-none"></div>
      
      {/* Content container with max width */}
      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-24 pb-0 z-10">
        
        {/* Desktop layout (1000px+): Side by side with potential overlap */}
        <div className="hidden lg:flex items-end">
          {/* Text on the left */}
          <div className="max-w-xl mb-32 ml-0 lg:ml-8 z-20 animate-fade-in-up">
            <h1 className="text-4xl text-gray-900 dark:text-gray-100">
              {title}
              <br />
              <span className="font-bold text-5xl">{name}</span>
            </h1>
            <p className="mt-6 text-xl text-gray-700 dark:text-gray-300">
              {subtitle}
            </p>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {cta}
            </p>
            <Button className="mt-6" size="lg">
              {buttonText}
            </Button>
          </div>

          {/* Image on the right, can overlap */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className="ml-auto h-[500px] object-contain self-end z-10 animate-fade-in-right"
          />
        </div>

        {/* Mobile/Tablet layout (below 1000px): Stacked */}
        <div className="lg:hidden flex flex-col items-center text-center space-y-8 pb-0">
          {/* Text first */}
          <div className="max-w-xl px-4 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl text-gray-900 dark:text-gray-100">
              {title}
              <br />
              <span className="font-bold text-4xl md:text-5xl">{name}</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300">
              {subtitle}
            </p>
            <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400">
              {cta}
            </p>
            <Button className="mt-6" size="lg">
              {buttonText}
            </Button>
          </div>

          {/* Image below text - no bottom spacing */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-[300px] md:h-[400px] object-contain animate-fade-in-up-delay"
          />
        </div>
      </div>
    </section>
  );
}