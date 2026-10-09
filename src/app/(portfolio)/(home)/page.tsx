import { sanityFetch } from '@/sanity/lib/live';
import { AllBlogsQuery2 } from '@/sanity/query';
import type { Blogs } from '../../../../types';
import SmoothScrollLenis from '@/components/SmoothScrollLenis';
import { Particles } from '@/components/Particles';
import MaskPage from '@/components/pages/home/MaskPage';
import RegularPage from '@/components/pages/home/RegularPage';

export default async function Home() {
  const blogsData: Blogs[] = await (await sanityFetch({ query: AllBlogsQuery2 })).data.slice(0, 3);

  return (
    <SmoothScrollLenis>
      <main className="relative bg-dark-blue text-white">
        <Particles className="pointer-events-auto fixed inset-0 z-0 h-screen" />
        <MaskPage blogs={blogsData} />
        <RegularPage blogs={blogsData} />
      </main>
    </SmoothScrollLenis>
  );
}
