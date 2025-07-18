'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  // Simple nav links
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
  ];

  // Handle light/dark toggle
  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <nav className="flex items-center justify-between p-4 border-b border-border bg-background text-foreground">
      {/* Logo / Brand */}
      <Link href="/" className="font-bold text-xl">
        Yannick Desiron
      </Link>

      {/* Navigation links (desktop) */}
      <div className="hidden md:flex space-x-6">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`hover:underline ${
              pathname === href ? 'font-semibold underline' : ''
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Right side buttons */}
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />

        <Button size="sm" variant="outline" onClick={toggleTheme}>
          {theme === 'dark' ? 'Light' : 'Dark'}
        </Button>
      </div>
    </nav>
  );
}
