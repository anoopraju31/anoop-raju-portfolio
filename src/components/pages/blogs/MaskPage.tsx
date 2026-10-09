'use client';

import { type FC } from 'react';
import Link from 'next/link';
import { FiArrowUpRight, FiBookOpen } from 'react-icons/fi';

import type { Blogs } from '../../../../types';
import useAppDispatch from '@/hooks/useAddDispatch';
import { mouseEnter, mouseLeave } from '@/redux/features/textHoverSlice';
import { cn } from '@/utills';
import Mask from '@/components/mask';
import BlogCard from '@/components/blogCard';
import MagneticContainer from '@/components/MagneticContainer';

import styles from './styles.module.css';

type Props = {
  blogs: Blogs[];
};

const MaskPage: FC<Props> = ({ blogs }) => {
  const dispatch = useAppDispatch();

  const handleMouseEnter = () => dispatch(mouseEnter());
  const handleMouseLeave = () => dispatch(mouseLeave());
  const countDisplay = blogs?.length ? String(blogs.length).padStart(2, '0') : '00';

  return (
    <div className="absolute left-0 right-0 top-0 w-full">
      <Mask>
        <section className={styles.section} aria-label="blogs">
          <div className={styles.container}>
            {/* Hero Header Section */}
            <header className={styles.heroSection}>
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(styles.eyebrowBadge, styles.eyebrowBadgeMask)}
              >
                <span className={cn(styles.pulseDot, styles.pulseDotMask)} />
                <span>Engineering Journal &bull; Insights &amp; Tech</span>
              </div>

              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <h1 className={cn(styles.mainHeading, styles.headingMask)}>
                  Articles, Notes <span className={styles.headingHighlightMask}>&amp; Studies</span>
                </h1>
              </div>

              <p
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(styles.heroSubtitle, styles.heroSubtitleMask)}
              >
                Technical deep-dives into modern web architecture, frontend performance, React internals, generative UI,
                and software engineering philosophy.
              </p>

              {/* Quick Stats Bar */}
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.statsBar}>
                <div className={cn(styles.statItem, styles.statItemMask)}>
                  <span className={styles.statNumberMask}>{countDisplay}</span>
                  <span>Articles Published</span>
                </div>
                <div className={cn(styles.statItem, styles.statItemMask)}>
                  <span className={styles.statNumberMask}>Next.js &bull; React</span>
                  <span>Frontend Core</span>
                </div>
                <div className={cn(styles.statItem, styles.statItemMask)}>
                  <span className={styles.statNumberMask}>WebGL &bull; Kinetic</span>
                  <span>Interactive UI</span>
                </div>
              </div>
            </header>

            {/* Articles Showcase Grid */}
            {blogs && blogs.length > 0 ? (
              <div className={styles.blogGrid}>
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="h-full"
                  >
                    <BlogCard isMask blog={blog} />
                  </div>
                ))}
              </div>
            ) : (
              <div className={cn(styles.emptyState, styles.emptyStateMask)}>
                <FiBookOpen size={48} className="mb-4 text-dark-blue opacity-70" />
                <h3 className={styles.emptyTitle}>New Articles in Progress</h3>
                <p className={styles.emptyDescription}>
                  Technical articles exploring performance tuning, state management, and bespoke animations are
                  currently being written. Stay tuned!
                </p>
              </div>
            )}

            {/* Bottom CTA Banner */}
            <section className={cn(styles.bottomCtaSection, styles.bottomCtaSectionMask)}>
              <span
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(styles.ctaEyebrow, styles.ctaEyebrowMask)}
              >
                Have questions or thoughts?
              </span>
              <h2
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(styles.ctaTitle, styles.ctaTitleMask)}
              >
                Let&apos;s start a conversation
              </h2>
              <p
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(styles.ctaDescription, styles.ctaDescriptionMask)}
              >
                Interested in discussing an engineering topic, technical collaboration, or exploring opportunities
                together?
              </p>
              <div className={styles.ctaButtonWrapper}>
                <MagneticContainer>
                  <Link href="/contact" className={cn(styles.ctaButton, styles.ctaButtonMask)}>
                    <span>Get in Touch</span>
                    <FiArrowUpRight size={18} />
                  </Link>
                </MagneticContainer>
              </div>
            </section>
          </div>
        </section>
      </Mask>
    </div>
  );
};

export default MaskPage;
