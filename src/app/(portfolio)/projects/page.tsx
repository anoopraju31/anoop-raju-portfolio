import { cn } from '@/utills';
import { type FC } from 'react';
import { type Metadata } from 'next';
import { Gantari } from 'next/font/google';
import { Particles } from '@/components/Particles';
import RegularPage from './sections/RegularPage';
import MaskPage from './sections/MaskPage';
import SmoothScrollLenis from '@/components/SmoothScrollLenis';

const gantari = Gantari({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Projects | Anoop Raju',
  description:
    'Explore curated software engineering projects, production web applications, and interactive digital experiments by Anoop Raju.',
};

const ProjectsPage: FC = () => {
  return (
    <SmoothScrollLenis>
      <main className={cn('relative min-h-screen overflow-x-hidden bg-dark-blue text-white', gantari.className)}>
        {/* High-tech interactive Particle Canvas Background */}
        <Particles className="pointer-events-auto fixed inset-0 z-0 h-screen" />

        {/* Soft ambient atmospheric glows */}
        <div className="pointer-events-none fixed -left-48 top-1/4 z-0 h-96 w-96 rounded-full bg-light-green/[0.03] blur-[140px]" />
        <div className="pointer-events-none fixed -right-48 bottom-1/3 z-0 h-96 w-96 rounded-full bg-light-green/[0.03] blur-[140px]" />

        {/* Interactive SVG Mask Layer */}
        <MaskPage />

        {/* Main Regular Page Layer */}
        <RegularPage />
      </main>
    </SmoothScrollLenis>
  );
};

export default ProjectsPage;
