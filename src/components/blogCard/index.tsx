'use client';

import { type FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { FiArrowUpRight, FiClock, FiFileText } from 'react-icons/fi';
import { Blogs } from '../../../types';
import { urlFor } from '@/sanity/lib/image';
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch';
import { mouseEnter, mouseLeave } from '@/app/(portfolio)/features/textHoverSlice';
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
      className={`${styles.cardLink} group`}
    >
      <article className={`${styles.card} ${isMask ? styles.cardMask : styles.cardRegular}`}>
        {/* Media Preview Frame */}
        <div className={`${styles.mediaContainer} ${isMask ? styles.mediaMask : styles.mediaRegular}`}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={blog.title || 'Blog cover image'}
              width={800}
              height={500}
              className={`${styles.image} ${isMask ? styles.imageMask : ''}`}
            />
          ) : (
            <div
              className={`${styles.fallbackCover} ${isMask ? styles.fallbackCoverMask : styles.fallbackCoverRegular}`}
            >
              <FiFileText size={40} className={isMask ? 'text-dark-blue/20' : 'text-white/20'} />
            </div>
          )}
        </div>

        {/* Metadata Header */}
        <div className={styles.metaHeader}>
          <span className={`${styles.badge} ${isMask ? styles.badgeMask : styles.badgeRegular}`}>{tag}</span>
          <div className={`${styles.readTime} ${isMask ? styles.readTimeMask : styles.readTimeRegular}`}>
            <FiClock size={12} />
            <span>{readTimeText}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className={styles.contentArea}>
          <h3 className={`${styles.title} ${isMask ? styles.titleMask : styles.titleRegular}`}>{blog.title}</h3>
        </div>

        {/* Footer Meta Row */}
        <footer className={`${styles.footer} ${isMask ? styles.footerMask : styles.footerRegular}`}>
          <div className={styles.date}>
            <span className={`${styles.dateDot} ${isMask ? styles.dateDotMask : styles.dateDotRegular}`} />
            <time dateTime={blog.date}>{formattedDate}</time>
          </div>

          <div className={`${styles.actionArrow} ${isMask ? styles.actionArrowMask : styles.actionArrowRegular}`}>
            <FiArrowUpRight size={16} />
          </div>
        </footer>
      </article>
    </Link>
  );
};

export default BlogCard;
