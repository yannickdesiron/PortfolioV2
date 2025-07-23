'use client'

import React, { useEffect, useRef, useState } from 'react';

interface AboutProps {
  title: string;
  description: string;
}

export default function About({ title, description }: AboutProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Skills array defined directly in the component
  const skills = [
    "Node.js",
    "React",
    "Next.js", 
    "Angular",
    ".NET",
    ".NET MAUI",
    "React Native",
    "PostgreSQL",
    "Docker"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -100px 0px' // Start animation slightly before fully in view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative w-full min-h-[400px] bg-white dark:bg-slate-950"
    >
      {/* Content container with max width - same as Hero */}
      <div className="w-full max-w-7xl mx-auto px-16 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <h2 className={`text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 transition-all duration-700 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {title}
          </h2>
          
          {/* Description */}
          <div className={`text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-12 text-justify transition-all duration-700 delay-200 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {description.split('\n').map((paragraph, index) => (
              <p key={index} className={index > 0 ? 'mt-4' : ''}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Skills section */}
          <div className={`transition-all duration-700 delay-400 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Skills & Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={skill}
                  className={`px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium transition-all duration-500 ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${600 + index * 100}ms` : '0ms'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
