'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Download, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResumeTranslations {
  name: string;
  title: string;
  download: string;
  summary: {
    title: string;
    content: string;
  };
  experience: {
    title: string;
    basketball: {
      title: string;
      period: string;
      teams: string;
      achievement1: string;
      achievement2: string;
      achievement3: string;
      achievement4: string;
    };
    internship: {
      title: string;
      period: string;
      company: string;
      achievement1: string;
      achievement2: string;
      achievement3: string;
      achievement4: string;
    };
  };
  education: {
    title: string;
    thomasMore: {
      title: string;
      period: string;
      school: string;
      achievement1: string;
      achievement2: string;
      achievement3: string;
      achievement4: string;
      achievement5: string;
    };
    leuven: {
      title: string;
      period: string;
      school: string;
      achievement1: string;
      achievement2: string;
    };
  };
  contact: {
    title: string;
    phone: string;
    email: string;
    address: string;
  };
  languages: {
    title: string;
    dutch: string;
    native: string;
    english: string;
    excellent: string;
    french: string;
    good: string;
  };
  skills: {
    title: string;
    frontend: string;
    backend: string;
    databases: string;
    devops: string;
    mobile: string;
  };
}

interface ResumeProps {
  translations: ResumeTranslations;
}

export default function Resume({ translations }: ResumeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <div ref={sectionRef} className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20">
      <div className="w-full max-w-4xl mx-auto px-8 py-12">
        
        {/* Header with Download Button */}
        <div className={`flex justify-between items-start mb-12 transition-all duration-700 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {translations.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {translations.title}
            </p>
          </div>
          
          {/* Download Button */}
          <Button asChild className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 border-0">
            <a href="/resume.pdf" download="Yannick-Desiron-Resume.pdf">
              <Download className="h-4 w-4 mr-2" />
              {translations.download}
            </a>
          </Button>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-12 transition-all duration-700 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`} style={{
          transitionDelay: isVisible ? '200ms' : '0ms'
        }}>
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Summary */}
            <section className={`transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`} style={{
              transitionDelay: isVisible ? '400ms' : '0ms'
            }}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-blue-900 pb-2">
                {translations.summary.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                {translations.summary.content}
              </p>
            </section>

            {/* Experience */}
            <section className={`transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`} style={{
              transitionDelay: isVisible ? '600ms' : '0ms'
            }}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b border-blue-900 pb-2">
                {translations.experience.title}
              </h2>
              
              {/* Basketball Career */}
              <div className="mb-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {translations.experience.basketball.title}
                  </h3>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    {translations.experience.basketball.period}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {translations.experience.basketball.teams}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-900 mr-2">•</span>
                    {translations.experience.basketball.achievement1}
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-900 mr-2">•</span>
                    {translations.experience.basketball.achievement2}
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-900 mr-2">•</span>
                    {translations.experience.basketball.achievement3}
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-900 mr-2">•</span>
                    {translations.experience.basketball.achievement4}
                  </li>
                </ul>
              </div>

              {/* Internship */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {translations.experience.internship.title}
                  </h3>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    {translations.experience.internship.period}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {translations.experience.internship.company}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-900 mr-2">•</span>
                    {translations.experience.internship.achievement1}
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-900 mr-2">•</span>
                    {translations.experience.internship.achievement2}
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-900 mr-2">•</span>
                    {translations.experience.internship.achievement3}
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-900  mr-2">•</span>
                    {translations.experience.internship.achievement4}
                  </li>
                </ul>
              </div>
            </section>

            {/* Education */}
            <section className={`transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`} style={{
              transitionDelay: isVisible ? '800ms' : '0ms'
            }}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b border-blue-900 pb-2">
                {translations.education.title}
              </h2>
              
              {/* Thomas More */}
              <div className="mb-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {translations.education.thomasMore.title}
                  </h3>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    {translations.education.thomasMore.period}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {translations.education.thomasMore.school}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-900 mr-2">•</span>
                    {translations.education.thomasMore.achievement1}
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-900 mr-2">•</span>
                    {translations.education.thomasMore.achievement2}
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-900 mr-2">•</span>
                    {translations.education.thomasMore.achievement3}
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-900 mr-2">•</span>
                    {translations.education.thomasMore.achievement4}
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-900 mr-2">•</span>
                    {translations.education.thomasMore.achievement5}
                  </li>
                </ul>
              </div>

              {/* Hogeschool Leuven */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {translations.education.leuven.title}
                  </h3>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    {translations.education.leuven.period}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {translations.education.leuven.school}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-900 mr-2">•</span>
                    {translations.education.leuven.achievement1}
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-900 mr-2">•</span>
                    {translations.education.leuven.achievement2}
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            
            {/* Contact Info */}
            <section className={`transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`} style={{
              transitionDelay: isVisible ? '1000ms' : '0ms'
            }}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
                {translations.contact.title}
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-blue-900" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {translations.contact.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-blue-900" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {translations.contact.email}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-blue-900" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {translations.contact.address}
                  </span>
                </div>
              </div>
            </section>

            {/* Languages */}
            <section className={`transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`} style={{
              transitionDelay: isVisible ? '1200ms' : '0ms'
            }}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
                {translations.languages.title}
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{translations.languages.dutch}</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{translations.languages.native}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{translations.languages.english}</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{translations.languages.excellent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{translations.languages.french}</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{translations.languages.good}</span>
                </div>
              </div>
            </section>

            {/* Technical Skills */}
            <section className={`transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`} style={{
              transitionDelay: isVisible ? '1400ms' : '0ms'
            }}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
                {translations.skills.title}
              </h2>
              
              {/* Frontend */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {translations.skills.frontend}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['HTML', 'CSS (Tailwind)', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Angular'].map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {translations.skills.backend}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['C#', '.NET Core / ASP.NET', 'Entity Framework'].map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Databases */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {translations.skills.databases}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['PostgreSQL', 'SQL Server'].map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* DevOps & Tools */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {translations.skills.devops}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Docker', 'GitHub / Azure DevOps', 'Microsoft Entra ID'].map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mobile */}
              <div className="border-b border-gray-300 dark:border-gray-700 pb-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {translations.skills.mobile}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['React Native', '.NET MAUI'].map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
