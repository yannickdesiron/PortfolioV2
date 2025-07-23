'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ExperiencesProps {
  title: string;
  basketballTitle: string;
  basketballPeriod: string;
  basketballAchievements: string[];
  internshipTitle: string;
  internshipPeriod: string;
  internshipAchievements: string[];
  schoolTitle: string;
  schoolPeriod: string;
  schoolAchievements: string[];
}

export default function Experiences({ 
  title, 
  basketballTitle, 
  basketballPeriod, 
  basketballAchievements,
  internshipTitle,
  internshipPeriod,
  internshipAchievements,
  schoolTitle,
  schoolPeriod,
  schoolAchievements
}: ExperiencesProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const experiences = [
    {
      title: internshipTitle,
      period: internshipPeriod,
      achievements: internshipAchievements,
      color: "blue", 
      skills: [".NET", "Angular", "Azure DevOps", "REST APIs", "Agile"]
    },
    {
      title: schoolTitle,
      period: schoolPeriod,
      achievements: schoolAchievements,
      color: "green",
      skills: ["React", "Angular", ".NET Core", "C#", "TypeScript", "SQL", "Docker", "GitHub"]
    },
    {
      title: basketballTitle,
      period: basketballPeriod,
      achievements: basketballAchievements,
      color: "orange",
      skills: ["Leadership", "Teamwork", "Communication", "Pressure Management", "Discipline"]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
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
      id="experiences" 
      className="relative w-full min-h-[400px] bg-gray-50 dark:bg-slate-900"
    >
      {/* Content container with max width - same as other sections */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <h2 className={`text-3xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center transition-all duration-700 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {title}
          </h2>
          
          {/* Timeline Container */}
          <div className="relative">
            {/* Desktop: Central Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gray-300 dark:bg-gray-600"></div>
            
            {/* Mobile: Left Timeline Line */}
            <div className="md:hidden absolute left-6 top-0 w-0.5 h-full bg-gray-300 dark:bg-gray-600"></div>
            
            {/* Experiences List */}
            <div className="space-y-8 md:space-y-4">
              {experiences.map((experience, index) => (
                <div 
                  key={index} 
                  className={`relative transition-all duration-700 ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${200 + index * 200}ms` : '0ms'
                  }}
                >
                  
                  {/* Mobile Layout */}
                  <div className="md:hidden flex">
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex items-start justify-center w-12 pt-2">
                      <div className="w-4 h-4 rounded-full bg-gray-700 dark:bg-gray-300"></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 ml-4">
                      <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          {experience.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
                          {experience.period}
                        </p>
                        <ul className="text-sm md:text-base space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                          {experience.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex} className="flex items-start">
                              <span className="text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0">–</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {/* Skills for mobile */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Skills & Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {experience.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className={`hidden md:flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    
                    {/* Content Side */}
                    <div className={`w-[calc(50%-40px)] ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          {experience.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
                          {experience.period}
                        </p>
                        <ul className="text-base space-y-2 text-gray-700 dark:text-gray-300">
                          {experience.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex} className="flex items-start">
                              <span className="text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0">–</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="relative z-10 flex items-center justify-center w-20 h-4">
                      <div className="w-4 h-4 rounded-full bg-gray-700 dark:bg-gray-300"></div>
                    </div>

                    {/* Skills Side */}
                    <div className={`w-[calc(50%-40px)] ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                      <div className={`${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Skills & Technologies</h4>
                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                          {experience.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
