import React from 'react';
import MobileProject from './MobileProject';
import DesktopProject from './DesktopProject';

interface ProjectsProps {
  title: string;
}

export default function Projects({ title }: ProjectsProps) {
  // Your actual projects
  const projects = [
    {
      type: 'desktop' as const,
      title: 'Portfolio Website v1',
      description: 'A modern and responsive portfolio website built with Next.js and HeroUI to showcase my projects and skills.',
      technologies: ['React', 'Next.js', 'Tailwind CSS'],
      screenshot: '/images/projects/projectPortfolio1.png',
      liveUrl: 'https://your-portfolio-v1.com', // Replace with actual URL
      githubUrl: 'https://github.com/yourusername/portfolio-v1', // Replace with actual URL
      bgColor: 'bg-indigo-100 dark:bg-indigo-950' // Indigo variant
    },
    {
      type: 'mobile' as const,
      title: 'Mellog Blog App',
      description: 'My current project: a mobile companion app for the Mellog blogging platform with full social features and post management.',
      technologies: ['React Native'],
      screenshot: '/images/projects/projectMellogMobile.png',
      liveUrl: 'https://play.google.com/store/apps/details?id=mellog.app', // Replace with actual URL
      githubUrl: 'https://github.com/yourusername/mellog-mobile', // Replace with actual URL
      bgColor: 'bg-teal-100 dark:bg-teal-950' // Teal variant
    },
    {
      type: 'desktop' as const,
      title: 'Dashboard Project',
      description: 'A web dashboard developed during my programming training to practice Agile methodology and backend technologies.',
      technologies: ['ASP.NET', 'SQL', 'Agile'],
      screenshot: '/images/projects/projectDashboard.png',
      liveUrl: 'https://your-dashboard.com', // Replace with actual URL
      githubUrl: 'https://github.com/yourusername/dashboard-project', // Replace with actual URL
      bgColor: 'bg-sky-200 dark:bg-sky-950' // Sky variant
    },
    {
      type: 'desktop' as const,
      title: 'Portfolio Website v2',
      description: 'This current portfolio website built with Next.js 15, featuring multilingual support, dark mode, and modern animations.',
      technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'next-intl', 'next-themes'],
      screenshot: '/images/projects/projectportfolio2.png', // You'll need to add this image
      liveUrl: 'https://your-current-portfolio.com', // Replace with actual URL
      githubUrl: 'https://github.com/yourusername/portfolio-v2', // Replace with actual URL
      bgColor: 'bg-zinc-200 dark:bg-zinc-800' // Zinc variant (using 800 as requested)
    }
  ];

  return (
    <div id="projects" className="relative w-full min-h-[400px]">
      {/* Section Title */}
      <div className="bg-white dark:bg-slate-950 py-20">
        <div className="w-full max-w-7xl mx-auto px-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
            {title}
          </h2>
        </div>
      </div>
      
      {/* Projects List */}
      <div>
        {projects.map((project, index) => (
          <section key={index} className={`w-full py-20 ${project.bgColor}`}>
            <div className="w-full max-w-7xl mx-auto px-16">
              <div className="max-w-6xl mx-auto">
                {project.type === 'desktop' ? (
                  <DesktopProject
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    screenshot={project.screenshot}
                    liveUrl={project.liveUrl}
                    githubUrl={project.githubUrl}
                    reversed={index % 2 === 1} // Alternate layout
                  />
                ) : (
                  <MobileProject
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    screenshot={project.screenshot}
                    liveUrl={project.liveUrl}
                    githubUrl={project.githubUrl}
                    reversed={index % 2 === 1} // Alternate layout
                  />
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
