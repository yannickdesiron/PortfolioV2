import React from 'react';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileProjectProps {
  title: string;
  description: string;
  technologies: string[];
  screenshot: string;
  liveUrl?: string;
  githubUrl?: string;
  reversed?: boolean; // To alternate layout
}

export default function MobileProject({
  title,
  description,
  technologies,
  screenshot,
  liveUrl,
  githubUrl,
  reversed = false
}: MobileProjectProps) {
  return (
    <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
      reversed ? 'lg:flex-row-reverse' : ''
    }`}>
      
      {/* Project Info */}
      <div className="flex-1 space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
        
        {/* Technologies */}
        <div>
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-4">
          {liveUrl && (
            <Button asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View App
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button variant="outline" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                View Code
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Frame with Screenshot */}
      <div className="flex-1 flex justify-center">
        <div className="relative">
          {/* Mobile Phone Frame */}
          <div className="relative w-64 h-[520px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
            {/* Screen */}
            <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
              
              {/* Screenshot */}
              <div className="w-full h-full relative">
                <Image
                  src={screenshot}
                  alt={`${title} screenshot`}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
            
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
