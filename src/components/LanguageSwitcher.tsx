'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { JSX, useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LanguageSwitcher(): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Get current locale from pathname
  const currentLocale = pathname.startsWith('/nl') ? 'nl' : 'en';

  // Add type for locale parameter
  function switchLocale(locale: 'en' | 'nl') {
    // Replace current locale prefix or add locale if none exists
    const newPath = pathname.replace(/^\/(en|nl)/, `/${locale}`);
    router.push(newPath);
    setIsOpen(false); // Close dropdown after selection
  }

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'nl', label: 'Nederlands', flag: '🇳🇱' }
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale);

  return (
    <div className="relative">
      {/* Trigger Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 p-0 cursor-pointer"
      >
        <Globe className="h-4 w-4" />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-background/95 backdrop-blur-md border border-border rounded-md shadow-lg z-20">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => switchLocale(language.code as 'en' | 'nl')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-colors flex items-center gap-3 ${
                    currentLocale === language.code ? 'bg-muted font-medium' : ''
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.label}</span>
                  {currentLocale === language.code && (
                    <span className="ml-auto text-xs text-muted-foreground">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
