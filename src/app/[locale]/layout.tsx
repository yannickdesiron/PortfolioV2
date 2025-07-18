import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import Navbar from '@/components/Navbar';  // Import your Navbar here
import { ThemeProvider } from 'next-themes';

const locales = ['en', 'nl'];

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />        {/* <-- Add Navbar here */}
            <main>{children}</main> {/* Wrap page content */}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
