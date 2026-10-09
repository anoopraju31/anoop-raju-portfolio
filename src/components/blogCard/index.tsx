'use client';

import { type FC } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowUpRight, FiClock, FiFileText } from 'react-icons/fi';

import type { Blogs } from '../../../types';
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch';
import { mouseEnter, mouseLeave } from '@/redux/features/textHoverSlice';
import { cn } from '@/utills';
import { urlFor } from '@/sanity/lib/image';

import styles from './styles.module.css';

type Props = {
  isMask?: boolean;
  blog: Blogs;
};

function getCoverImageUrl(coverImage: any): string | null {
  if (!coverImage) return null;
  if (typeof coverImage === 'string') return coverImage;
  if (coverImage?.asset?._ref || coverImage?.asset?.url) {
    try {
      return urlFor(coverImage).width(800).height(500).url();
    } catch {
      return null;
    }
  }
  return null;
}

const BlogCard: FC<Props> = ({ isMask, blog }) => {
  const dispatch = useAppDispatch();
  const imageUrl = getCoverImageUrl(blog.coverImage);
  const tag = blog.tags?.[0] ?? 'Engineering';
  const readTimeText = blog.readTime ? `${blog.readTime} min read` : '4 min read';
  const formattedDate = blog.date ? format(new Date(blog.date), 'MMM d, yyyy') : 'Recent';

  const handleMouseEnter = () => dispatch(mouseEnter());
  const handleMouseLeave = () => dispatch(mouseLeave());

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(styles.cardLink, 'group')}
    >
      <article className={cn(styles.card, isMask ? styles.cardMask : styles.cardRegular)}>
        {/* Media Preview Frame */}
        <div className={cn(styles.mediaContainer, isMask ? styles.mediaMask : styles.mediaRegular)}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={blog.title || 'Blog cover image'}
              width={800}
              height={500}
              className={cn(styles.image, isMask ? styles.imageMask : '')}
            />
          ) : (
            <div className={cn(styles.fallbackCover, isMask ? styles.fallbackCoverMask : styles.fallbackCoverRegular)}>
              <FiFileText size={40} className={isMask ? 'text-dark-blue/20' : 'text-white/20'} />
            </div>
          )}
        </div>

        {/* Metadata Header */}
        <div className={styles.metaHeader}>
          <span className={cn(styles.badge, isMask ? styles.badgeMask : styles.badgeRegular)}>{tag}</span>
          <div className={cn(styles.readTime, isMask ? styles.readTimeMask : styles.readTimeRegular)}>
            <FiClock size={12} />
            <span>{readTimeText}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className={styles.contentArea}>
          <h3 className={cn(styles.title, isMask ? styles.titleMask : styles.titleRegular)}>{blog.title}</h3>
        </div>

        {/* Footer Meta Row */}
        <footer className={cn(styles.footer, isMask ? styles.footerMask : styles.footerRegular)}>
          <div className={styles.date}>
            <span className={cn(styles.dateDot, isMask ? styles.dateDotMask : styles.dateDotRegular)} />
            <time dateTime={blog.date}>{formattedDate}</time>
          </div>

          <div className={cn(styles.actionArrow, isMask ? styles.actionArrowMask : styles.actionArrowRegular)}>
            <FiArrowUpRight size={16} />
          </div>
        </footer>
      </article>
    </Link>
  );
};

export default BlogCard;
