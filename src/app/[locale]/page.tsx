// src/app/[locale]/page.tsx
import { getTranslations } from 'next-intl/server';
import { Link} from '@/i18n/navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experiences from '@/components/Experiences';
import Projects from '@/components/Projects';

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const heroT = await getTranslations({ locale, namespace: 'hero' });
  const aboutT = await getTranslations({ locale, namespace: 'about' });
  const experiencesT = await getTranslations({ locale, namespace: 'experiences' });
  const projectsT = await getTranslations({ locale, namespace: 'projects' });

  console.log('[page] locale:', locale);
  console.log('[page] title:', heroT('title'));

  return (
    <main>
      <Hero
        title={heroT('title')}
        name={heroT('name')}
        subtitle={heroT('subtitle')}
        cta={heroT('cta')}
        buttonText={heroT('buttonText')}
        imageSrc="/images/portrait4.png" // put your image in public/images/
        imageAlt={heroT('imageAlt')}
      />
      <About
        title={aboutT('title')}
        description={aboutT('description')}
      />
      <Experiences 
        title={experiencesT('title')} 
        basketballTitle={experiencesT('basketball.title')} 
        basketballPeriod={experiencesT('basketball.period')} 
        basketballAchievements={[
          experiencesT('basketball.achievement1'),
          experiencesT('basketball.achievement2'),
          experiencesT('basketball.achievement3'),
          experiencesT('basketball.achievement4'),
          experiencesT('basketball.achievement5')
        ]} 
        internshipTitle={experiencesT('internship.title')} 
        internshipPeriod={experiencesT('internship.period')} 
        internshipAchievements={[
          experiencesT('internship.achievement1'),
          experiencesT('internship.achievement2'),
          experiencesT('internship.achievement3'),
          experiencesT('internship.achievement4')
        ]}
        schoolTitle={experiencesT('school.title')} 
        schoolPeriod={experiencesT('school.period')} 
        schoolAchievements={[
          experiencesT('school.achievement1'),
          experiencesT('school.achievement2'),
          experiencesT('school.achievement3'),
          experiencesT('school.achievement4'),
          experiencesT('school.achievement5')
        ]} 
      />
      <Projects title={projectsT('title')} />
    </main>
  );
}
  