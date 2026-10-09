'use client';

import { type FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiArrowUpRight } from 'react-icons/fi';

import { cn } from '@/utills';

import styles from './styles.module.css';

const NotFoundBody: FC = () => {
  return (
    <section className={styles.body}>
      {/* Ambient background glow */}
      <div className={styles.glow} />

      <div className={styles.container}>
        {/* Status Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.badge}
        >
          <span className={styles.statusDot} />
          <span>[ 404 // SIGNAL LOST ]</span>
        </motion.div>

        {/* 404 Hero Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={styles.headingContainer}
        >
          <h1 className={styles.heading}>404</h1>
          <span className={styles.headingTag}>ERR_COORDINATE_NOT_FOUND</span>
        </motion.div>

        {/* Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className={styles.title}>Lost in the Digital Void</h2>
          <p className={styles.desc}>
            The coordinates you requested do not exist or were moved to another dimension. Let&apos;s get you back on
            track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={styles.buttonGroup}
        >
          <Link href="/" className={cn('group', styles.primaryBtn)}>
            <FiHome className="text-sm transition-transform group-hover:-translate-y-0.5" />
            <span>Return to Base</span>
          </Link>

          <Link href="/projects" className={cn('group', styles.secondaryBtn)}>
            <span>Explore Projects</span>
            <FiArrowUpRight className="text-sm transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Quick Navigation Terminal Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className={styles.navStrip}
        >
          <span className={styles.navLabel}>[ DIRECTORY ]</span>
          <Link href="/" className={styles.navLink}>
            ~/home
          </Link>
          <Link href="/projects" className={styles.navLink}>
            ~/projects
          </Link>
          <Link href="/blogs" className={styles.navLink}>
            ~/blogs
          </Link>
          <Link href="/contact" className={styles.navLink}>
            ~/contact
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFoundBody;
