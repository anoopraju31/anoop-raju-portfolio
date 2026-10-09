'use client';

import { type FC } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';

import { type Blogs } from '../../../../../../types';
import useAppDispatch from '@/hooks/useAddDispatch';
import { mouseEnter, mouseLeave } from '@/redux/features/textHoverSlice';
import { cn } from '@/utills';
import BlogCard from '@/components/blogCard';

import styles from './blog.module.css';

type Props = {
  blogs: Blogs[];
};

const TOPICS = [
  { label: 'Engineering', count: 'Architecture' },
  { label: 'Frontend', count: 'React & Next.js' },
  { label: 'Performance', count: 'Optimization' },
  { label: 'WebGL & UI', count: 'Motion & Canvas' },
];

const BlogMask: FC<Props> = ({ blogs }) => {
  const dispatch = useAppDispatch();
  const displayBlogs = blogs?.slice(0, 3) ?? [];

  const handleMouseEnter = () => dispatch(mouseEnter());
  const handleMouseLeave = () => dispatch(mouseLeave());

  return (
    <div className={styles.section} aria-label="latest blogs">
      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.headingContainer}>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(styles.eyebrowBadge, styles.eyebrowBadgeMask)}
          >
            <span className={cn(styles.pulseDot, styles.pulseDotMask)} />
            <span>Editorial &bull; Thoughts, Architecture &amp; Code</span>
          </div>

          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <h2 className={cn(styles.heading, styles.headingMask)}>
              Latest Articles <span className={styles.headingHighlightMask}>&amp; Writings</span>
            </h2>
          </div>

          <p
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(styles.subtitle, styles.subtitleMask)}
          >
            Deep dives into engineering architecture, web animations, UI/UX aesthetics, and scalable fullstack software
            development.
          </p>

          {/* Topic Highlights Bar */}
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.topicPillsRow}>
            {TOPICS.map((topic, i) => (
              <div key={i} className={cn(styles.topicPill, styles.topicPillMask)}>
                <span className={styles.topicTagMask}>#{topic.label}</span>
                <span>&bull; {topic.count}</span>
              </div>
            ))}
          </div>
        </header>

        {/* Cards Grid */}
        <div className={styles.gridWrapper}>
          {displayBlogs.length > 0 ? (
            <div className={styles.gridContainer}>
              {displayBlogs.map((blog) => (
                <BlogCard isMask key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dark-blue/20 bg-dark-blue/[0.04] py-16 text-center">
              <FiBookOpen size={36} className="mx-auto mb-3 text-dark-blue/60" />
              <p className="font-mono text-sm text-dark-blue/70">Articles coming soon. Check back shortly!</p>
            </div>
          )}

          {/* CTA Button */}
          <div className={styles.linkWrapper}>
            <Link
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              href="/blogs"
              className={cn(styles.ctaButton, styles.ctaButtonMask)}
            >
              <span>Explore All Articles</span>
              <FiArrowRight size={18} className={styles.ctaArrow} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogMask;
