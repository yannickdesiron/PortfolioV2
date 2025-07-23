'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import LanguageSwitcher from './LanguageSwitcher';
import { useEffect, useState } from 'react';
import { Sun, Moon, Menu } from 'lucide-react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('nav');

  // Wait until after hydration to avoid SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // Simple nav links with translations
  const navLinks = [
    { href: pathname.startsWith('/nl') ? '/nl' : '/en', label: t('home') },
    { href: (pathname.startsWith('/nl') ? '/nl' : '/en') + '#about', label: t('about') },
    { href: (pathname.startsWith('/nl') ? '/nl' : '/en') + '#experiences', label: t('experiences') },
    { href: (pathname.startsWith('/nl') ? '/nl' : '/en') + '#projects', label: t('projects') },
    { href: pathname.startsWith('/nl') ? '/nl/resume' : '/en/resume', label: t('resume') },
  ];

  // Handle light/dark toggle
  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  // Close mobile menu when clicking a link
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-fade-in-down ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="YD Logo"
            width={30}
            height={30}
            className="h-8 w-auto dark:invert"
          />
        </Link>

        {/* Navigation links (desktop only) */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:underline transition-colors ${
                pathname === href ? 'font-semibold underline' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop: Language switcher and theme toggle */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />

          {/* Theme Toggle with Icons */}
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={toggleTheme}
            className="relative w-10 h-10 p-0 cursor-pointer"
          >
            {!mounted ? (
              <div className="w-4 h-4" />
            ) : (
              <>
                <Sun 
                  className={`h-4 w-4 absolute transition-all ${
                    theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
                  }`} 
                />
                <Moon 
                  className={`h-4 w-4 absolute transition-all ${
                    theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
                  }`} 
                />
              </>
            )}
          </Button>
        </div>

        {/* Mobile: Burger menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-6 mt-6 px-4">
                {/* Mobile Navigation Links */}
                <div className="flex flex-col space-y-4">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={handleMobileLinkClick}
                      className={`text-lg hover:underline transition-colors py-2 ${
                        pathname === href ? 'font-semibold underline' : ''
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>

                {/* Mobile: Language switcher and theme toggle */}
                <div className="flex flex-col space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center space-x-4">
                    <LanguageSwitcher />
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={toggleTheme}
                      className="relative w-10 h-10 p-0"
                    >
                      {!mounted ? (
                        <div className="w-4 h-4" />
                      ) : (
                        <>
                          <Sun 
                            className={`h-4 w-4 absolute transition-all ${
                              theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
                            }`} 
                          />
                          <Moon 
                            className={`h-4 w-4 absolute transition-all ${
                              theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
                            }`} 
                          />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
