import { type FC } from 'react';
import { notFound } from 'next/navigation';

import type { PostQueryResult } from '../../../../../sanity.types';
import { sanityFetch } from '@/sanity/lib/live';
import { postQuery } from '@/sanity/query';
import RegularPage from '@/components/pages/blogPost/RegularPage';

// export const dynamic = 'force-dynamic'

// Force dynamic params so ISR works for new posts
export const dynamicParams = true;

// Cache invalidation interval
export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

const BlogPostPage: FC<Props> = async ({ params }) => {
  // @ts-ignore
  const post = await sanityFetch<PostQueryResult>({
    query: postQuery,
    params: await params,
  });

  if (!post.data?._id) return notFound();

  return (
    <main className="relative bg-dark-blue text-white">
      <RegularPage post={post.data} />
    </main>
  );
};

export default BlogPostPage;
