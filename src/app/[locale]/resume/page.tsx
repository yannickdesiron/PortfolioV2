import React from 'react';
import { getTranslations } from 'next-intl/server';
import Resume from '@/components/Resume';

export default async function ResumePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const resumeT = await getTranslations({ locale, namespace: 'resume' });

  return <Resume translations={resumeT} />;
}
