'use client';

import { type FC } from 'react';
import Link from 'next/link';
import { FiHome, FiArrowUpRight } from 'react-icons/fi';

import useAppDispatch from '@/hooks/useAddDispatch';
import { mouseEnter, mouseLeave } from '@/redux/features/textHoverSlice';
import { cn } from '@/utills';

import styles from './styles.module.css';

const NotFoundMask: FC = () => {
  const dispatch = useAppDispatch();

  const handleMouseEnter = () => dispatch(mouseEnter());
  const handleMouseLeave = () => dispatch(mouseLeave());

  return (
    <section className={styles.mask}>
      {/* Ambient background glow */}
      <div className={styles.glow} />

      <div className={styles.container}>
        {/* Status Eyebrow Badge */}
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.badge}>
          <span className={styles.statusDot} />
          <span>[ 404 // SIGNAL LOST ]</span>
        </div>

        {/* 404 Hero Heading */}
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.headingContainer}>
          <div className={styles.heading}>404</div>
          <span className={styles.headingTag}>ERR_COORDINATE_NOT_FOUND</span>
        </div>

        {/* Title & Description */}
        <div>
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.title}>
            Lost in the Digital Void
          </div>
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.desc}>
            The coordinates you requested do not exist or were moved to another dimension. Let&apos;s get you back on
            track.
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <Link
            href="/"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn('group', styles.primaryBtn)}
          >
            <FiHome className="text-sm" />
            <span>Return to Base</span>
          </Link>

          <Link
            href="/projects"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn('group', styles.secondaryBtn)}
          >
            <span>Explore Projects</span>
            <FiArrowUpRight className="text-sm" />
          </Link>
        </div>

        {/* Quick Navigation Terminal Strip */}
        <div className={styles.navStrip}>
          <span className={styles.navLabel}>[ DIRECTORY ]</span>
          <Link href="/" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.navLink}>
            ~/home
          </Link>
          <Link
            href="/projects"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={styles.navLink}
          >
            ~/projects
          </Link>
          <Link
            href="/blogs"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={styles.navLink}
          >
            ~/blogs
          </Link>
          <Link
            href="/contact"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={styles.navLink}
          >
            ~/contact
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundMask;
