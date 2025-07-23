import React from 'react';
import { getTranslations } from 'next-intl/server';
import Resume from '@/components/Resume';

export default async function ResumePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const resumeT = await getTranslations({ locale, namespace: 'resume' });

  // Extract all translations as strings to pass to client component
  const translations = {
    name: resumeT('name'),
    title: resumeT('title'),
    download: resumeT('download'),
    summary: {
      title: resumeT('summary.title'),
      content: resumeT('summary.content')
    },
    experience: {
      title: resumeT('experience.title'),
      basketball: {
        title: resumeT('experience.basketball.title'),
        period: resumeT('experience.basketball.period'),
        teams: resumeT('experience.basketball.teams'),
        achievement1: resumeT('experience.basketball.achievement1'),
        achievement2: resumeT('experience.basketball.achievement2'),
        achievement3: resumeT('experience.basketball.achievement3'),
        achievement4: resumeT('experience.basketball.achievement4')
      },
      internship: {
        title: resumeT('experience.internship.title'),
        period: resumeT('experience.internship.period'),
        company: resumeT('experience.internship.company'),
        achievement1: resumeT('experience.internship.achievement1'),
        achievement2: resumeT('experience.internship.achievement2'),
        achievement3: resumeT('experience.internship.achievement3'),
        achievement4: resumeT('experience.internship.achievement4')
      }
    },
    education: {
      title: resumeT('education.title'),
      thomasMore: {
        title: resumeT('education.thomasMore.title'),
        period: resumeT('education.thomasMore.period'),
        school: resumeT('education.thomasMore.school'),
        achievement1: resumeT('education.thomasMore.achievement1'),
        achievement2: resumeT('education.thomasMore.achievement2'),
        achievement3: resumeT('education.thomasMore.achievement3'),
        achievement4: resumeT('education.thomasMore.achievement4'),
        achievement5: resumeT('education.thomasMore.achievement5')
      },
      leuven: {
        title: resumeT('education.leuven.title'),
        period: resumeT('education.leuven.period'),
        school: resumeT('education.leuven.school'),
        achievement1: resumeT('education.leuven.achievement1'),
        achievement2: resumeT('education.leuven.achievement2')
      }
    },
    contact: {
      title: resumeT('contact.title'),
      phone: resumeT('contact.phone'),
      email: resumeT('contact.email'),
      address: resumeT('contact.address')
    },
    languages: {
      title: resumeT('languages.title'),
      dutch: resumeT('languages.dutch'),
      native: resumeT('languages.native'),
      english: resumeT('languages.english'),
      excellent: resumeT('languages.excellent'),
      french: resumeT('languages.french'),
      good: resumeT('languages.good')
    },
    skills: {
      title: resumeT('skills.title'),
      frontend: resumeT('skills.frontend'),
      backend: resumeT('skills.backend'),
      databases: resumeT('skills.databases'),
      devops: resumeT('skills.devops'),
      mobile: resumeT('skills.mobile')
    }
  };

  return <Resume translations={translations} />;
}
