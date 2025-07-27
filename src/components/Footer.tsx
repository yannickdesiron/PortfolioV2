'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  ArrowUp,
  Heart,
  Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations('footer');
  const navT = useTranslations('nav');

  // Get current locale for links
  const currentLocale = pathname.startsWith('/nl') ? 'nl' : 'en';
  const baseUrl = currentLocale === 'nl' ? '/nl' : '/en';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { href: baseUrl, label: navT('home') },
    { href: `${baseUrl}#about`, label: navT('about') },
    { href: `${baseUrl}#projects`, label: navT('projects') },
    { href: `${baseUrl}/resume`, label: navT('resume') },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/yannick-desiron', // Replace with your actual LinkedIn
      icon: Linkedin,
      color: 'hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/yannickdesiron', // Replace with your actual GitHub
      icon: Github,
      color: 'hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
    },
    {
      name: 'Email',
      href: 'mailto:yannickdesiron@hotmail.com',
      icon: Mail,
      color: 'hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
    }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
      <div className="w-full max-w-7xl mx-auto px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto">
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
              {t('contact.title')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4" />
                <a 
                  href="mailto:yannickdesiron@hotmail.com" 
                  className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  yannickdesiron@hotmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{t('contact.location')}</span>
              </div>
              <div className="mt-4">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Link href={`${baseUrl}/contact`}>
                    {/* <Mail className="h-4 w-4" /> */}
                    Contact Me
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Social Links & Back to Top */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
              {t('social.title')}
            </h3>
            <div className="flex gap-3 mb-6 justify-center">
              {socialLinks.map(({ name, href, icon: Icon, color }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group relative p-3 rounded-lg text-gray-600 dark:text-gray-400 
                    ${color} transition-all duration-200 transform hover:scale-105
                    border border-transparent hover:border-gray-200 dark:hover:border-gray-600
                  `}
                  aria-label={name}
                  title={name}
                >
                  <Icon className="h-6 w-6" />
                  
                  {/* Tooltip */}
                  <span className="
                    absolute -top-10 left-1/2 transform -translate-x-1/2 
                    bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 
                    text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 
                    transition-opacity duration-200 pointer-events-none
                    before:content-[''] before:absolute before:top-full before:left-1/2 
                    before:transform before:-translate-x-1/2 before:border-4 
                    before:border-transparent before:border-t-gray-900 dark:before:border-t-gray-100
                  ">
                    {name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
              {t('links.title')}
            </h3>
            <nav className="space-y-3">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 justify-items-center">
                {footerLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <a href="/resume.pdf" download="Yannick-Desiron-Resume.pdf">
                    <ArrowUp className="h-4 w-4 rotate-180" />
                    {t('links.downloadCv')}
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Yannick Desiron. {t('copyright')}
            </p>

            {/* Built with */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>{t('builtWith')}</span>
              <Heart className="h-4 w-4 text-gray-900 dark:text-gray-100" />
              <span>{t('using')}</span>
              <Code className="h-4 w-4" />
              <span>Next.js & TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
