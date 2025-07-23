import React from 'react';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DesktopProjectProps {
  title: string;
  description: string;
  technologies: string[];
  screenshot: string;
  liveUrl?: string;
  githubUrl?: string;
  reversed?: boolean; // To alternate layout
}

export default function DesktopProject({
  title,
  description,
  technologies,
  screenshot,
  liveUrl,
  githubUrl,
  reversed = false
}: DesktopProjectProps) {
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
                className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
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
                View Site
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

      {/* Laptop Frame with Screenshot */}
      <div className="flex-1 flex justify-center">
        <div className="relative">
          {/* Laptop Frame */}
          <div className="relative">
            {/* Screen */}
            <div className="w-96 h-64 bg-gray-900 rounded-t-xl p-3 shadow-2xl">
              <div className="w-full h-full bg-black rounded-lg overflow-hidden relative">
                {/* Screenshot */}
                <Image
                  src={screenshot}
                  alt={`${title} screenshot`}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
            
            {/* Laptop Base */}
            <div className="w-[420px] h-4 bg-gray-300 dark:bg-gray-700 rounded-b-xl -ml-3 shadow-lg"></div>
            
            {/* Trackpad */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-gray-400 dark:bg-gray-600 rounded"></div>
            
            {/* Apple Logo (optional - you can remove if you want) */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
