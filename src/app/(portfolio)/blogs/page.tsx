import { cn } from '@/utills';
import { type FC } from 'react';
import { type Metadata } from 'next';
import { Gantari } from 'next/font/google';
import { type Blogs } from '../../../../types';
import { sanityFetch } from '@/sanity/lib/live';
import { AllBlogsQuery2 } from '@/sanity/query';
import { Particles } from '@/components/Particles';
import MaskPage from './MaskPage';
import RegularPage from './RegularPage';
import SmoothScrollLenis from '@/components/SmoothScrollLenis';

const gantari = Gantari({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blogs | Anoop Raju',
  description:
    'Technical deep-dives, architectural notes, and perspectives on modern frontend engineering, React, Next.js, and interactive WebGL by Anoop Raju.',
};

const BlogsPage: FC = async () => {
  const blogsData: Blogs[] = (await (await sanityFetch({ query: AllBlogsQuery2 })).data) ?? [];

  return (
    <SmoothScrollLenis>
      <main className={cn('relative min-h-screen overflow-x-hidden bg-dark-blue text-white', gantari.className)}>
        {/* High-tech interactive Particle Canvas Background */}
        <Particles className="pointer-events-auto fixed inset-0 z-0 h-screen" />

        {/* Soft ambient atmospheric radial glows */}
        <div className="pointer-events-none fixed -left-48 top-1/4 z-0 h-96 w-96 rounded-full bg-light-green/[0.03] blur-[140px]" />
        <div className="pointer-events-none fixed -right-48 bottom-1/3 z-0 h-96 w-96 rounded-full bg-light-green/[0.03] blur-[140px]" />

        {/* Dual-layer interactive SVG Mask and Regular Content */}
        <MaskPage blogs={blogsData} />
        <RegularPage blogs={blogsData} />
      </main>
    </SmoothScrollLenis>
  );
};

export default BlogsPage;
