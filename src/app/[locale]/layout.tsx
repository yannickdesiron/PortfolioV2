// src/app/[locale]/layout.tsx
import '../globals.css';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import type { ReactNode } from 'react';

const locales = ['en', 'nl'];

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  console.log('[layout.tsx] Resolved locale:', locale);

  if (!locales.includes(locale)) {
    console.log('[layout.tsx] Locale not found, throwing 404');
    notFound();
  }

  const messages = await getMessages({ locale });

  console.log('[layout.tsx] Loaded messages:', messages);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
