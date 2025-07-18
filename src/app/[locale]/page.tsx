// src/app/[locale]/page.tsx
import { getTranslations } from 'next-intl/server';
import { Link} from '@/i18n/navigation';

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  console.log('[page] locale:', locale);
  console.log('[page] title:', t('title'));

  return (
    <main className="p-8 text-center">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="text-lg text-muted-foreground mt-4">{t('subtitle')}</p>
    </main>
  );
}
  