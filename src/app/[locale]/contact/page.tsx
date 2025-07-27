
import { getTranslations } from 'next-intl/server';
import Contact from '@/components/Contact';

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  // Gather all translations needed for the client Contact component
  const translations = {
    title: t('title'),
    intro: t('intro'),
    emailLabel: t('emailLabel'),
    email: t('email'),
    linkedinLabel: t('linkedinLabel'),
    linkedin: t('linkedin'),
    locationLabel: t('locationLabel'),
    location: t('location'),
    backToHome: t('backToHome'),
    formTitle: t('formTitle'),
    formName: t('formName'),
    formNamePlaceholder: t('formNamePlaceholder'),
    formEmail: t('formEmail'),
    formEmailPlaceholder: t('formEmailPlaceholder'),
    formMessage: t('formMessage'),
    formMessagePlaceholder: t('formMessagePlaceholder'),
    formSubmit: t('formSubmit'),
  };

  return <Contact translations={translations} />;
}
