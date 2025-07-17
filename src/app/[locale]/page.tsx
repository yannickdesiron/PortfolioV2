// src/app/[locale]/page.tsx
import { useLocale, useTranslations } from 'next-intl';
import { Link} from '@/i18n/navigation';

export default function HomePage() {
  const t = useTranslations('hero');
   const locale = useLocale();

  console.log('[page] locale:', locale);
  console.log('[page] title:', t('title'));

  return (
    <main className="p-8 text-center">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="text-lg text-muted-foreground mt-4">{t('subtitle')}</p>
    </main>
  );
}
  