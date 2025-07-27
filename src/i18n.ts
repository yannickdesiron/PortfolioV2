import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'nl'] as const;

export default getRequestConfig(async ({ locale }) => {
  
  const typedLocale = locales.includes(locale as unknown as (typeof locales)[number])
    ? (locale as (typeof locales)[number])
    : 'en';

  const messages = (await import(`./messages/${typedLocale}.json`)).default;

  return {
    locale: typedLocale,
    messages
  };
});
