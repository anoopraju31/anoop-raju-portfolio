import { cn } from '@/utills';
import { type FC } from 'react';
import { type Metadata } from 'next';
import { Gantari } from 'next/font/google';

import { Particles } from '@/components/Particles';
import RegularPage from './RegularPage';
import SmoothScrollLenis from '@/components/SmoothScrollLenis';

const gantari = Gantari({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Contact | Anoop Raju',
  description:
    'Get in touch with Anoop Raju for full-stack web development, bespoke interactive visual engineering, and software collaborations.',
};

const ContactPage: FC = () => {
  return (
    <SmoothScrollLenis>
      <main className={cn('relative min-h-screen overflow-x-hidden bg-dark-blue text-white', gantari.className)}>
        {/* High-tech interactive Particle Background Canvas */}
        <Particles className="pointer-events-auto fixed inset-0 z-0 h-screen" />

        {/* Soft ambient atmospheric glows */}
        <div className="pointer-events-none fixed -left-48 top-1/4 z-0 h-96 w-96 rounded-full bg-light-green/[0.03] blur-[140px]" />
        <div className="pointer-events-none fixed -right-48 bottom-10 z-0 h-96 w-96 rounded-full bg-light-green/[0.04] blur-[140px]" />

        {/* Main Content */}
        <RegularPage />
      </main>
    </SmoothScrollLenis>
  );
};

export default ContactPage;
