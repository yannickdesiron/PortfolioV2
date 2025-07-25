import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

function hasLocale(locales: readonly string[], locale: string): boolean {
  return locales.includes(locale);
}
 
export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const checkedLocale = requested ?? routing.defaultLocale;
  const locale = hasLocale(routing.locales, checkedLocale)
    ? checkedLocale
    : routing.defaultLocale;
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});