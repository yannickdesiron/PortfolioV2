'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { JSX } from 'react';

export default function LanguageSwitcher(): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();

  // Add type for locale parameter
  function switchLocale(locale: 'en' | 'nl') {
    // Replace current locale prefix or add locale if none exists
    const newPath = pathname.replace(/^\/(en|nl)/, `/${locale}`);
    router.push(newPath);
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => switchLocale('en')} className="btn">
        EN
      </button>
      <button onClick={() => switchLocale('nl')} className="btn">
        NL
      </button>
    </div>
  );
}
