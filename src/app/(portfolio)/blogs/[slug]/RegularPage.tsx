import { cn } from '@/utills';
import { type FC } from 'react';
import { type PortableTextBlock } from 'next-sanity';
import { type PostQueryResult } from '../../../../../sanity.types';
import { PT_Sans } from 'next/font/google';
import Link from 'next/link';
import { MdArrowForwardIos } from 'react-icons/md';
import CustomPortableText from './portable-text';
import styles from './styles.module.css';
import Image from 'next/image';

const ptSans = PT_Sans({ weight: ['700', '400'], subsets: ['latin'] });

type Props = {
  post: PostQueryResult;
};

const RegularPage: FC<Props> = ({ post }) => {
  if (!post?._id || !post.slug) return null;

  return (
    <div className={cn(styles.section, ptSans.className)}>
      <div className={styles.container}>
        {/* Breadcrumbs */}
        <div className="flex w-full items-center gap-2 px-4 sm:px-0">
          <Link className="text-grey-600" href="/">
            Home
          </Link>
          <MdArrowForwardIos className="text-grey-600" />
          <Link className="text-grey-600" href="/blogs">
            Blogs
          </Link>
          <MdArrowForwardIos className="text-grey-600" />
          <span className="inline-block font-light md:hidden">{post.title.slice(0, 15)}...</span>
          <span className="hidden font-light md:inline-block lg:hidden">{post.title.slice(0, 20)}...</span>
          <span className="hidden font-light lg:inline-block">{post.title.slice(0, 25)}...</span>
        </div>

        {/* Title */}
        <header className="vertical-left w-full gap-6">
          <h1 className="lg:text-40 leading-120 text-[28px] font-semibold sm:text-[32px] md:text-[36px]">
            {post.title}
          </h1>
        </header>

        <div className="w-full">
          {post.coverImage ? (
            <Image
              className="h-full w-full rounded-2xl object-contain"
              alt={post.coverImage}
              src={post.coverImage}
              priority
              width={2000}
              height={1000}
            />
          ) : null}
        </div>

        <CustomPortableText value={post.content as PortableTextBlock[]} />

        {post?.conclusion?.length && (
          <article className="w-full rounded-2xl bg-light-green p-4 pb-0 text-dark-blue md:p-6 md:pb-0">
            <h2
              id="conclusion-conclusion-123"
              className="text-grey-950 mb-4 w-full text-[24px] font-semibold leading-normal sm:mb-5 sm:text-[28px] md:mb-6 md:text-[32px] lg:mb-7 lg:text-[35px]"
            >
              Conclusion
            </h2>
            <CustomPortableText className="max-w-full" value={post.conclusion as PortableTextBlock[]} />
          </article>
        )}
      </div>
    </div>
  );
};

export default RegularPage;
