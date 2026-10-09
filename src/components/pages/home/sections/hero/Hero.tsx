'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowDown } from 'react-icons/fi';

import { slideToView } from '@/utills/animations';

import styles from './hero.module.css';

const Hero:FC = () => {
  return (
    <section className={styles.body}>
      <div className={styles['hero-container']}>
        {/* Status Eyebrow Badge */}
        <motion.div
          variants={slideToView}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-1 flex justify-center"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-light-green/30 bg-light-green/[0.06] px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-light-green shadow-sm backdrop-blur-md sm:text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-light-green" />
            <span>Available for Worldwide Opportunities</span>
          </div>
        </motion.div>

        <h1 className={styles['hero-heading-container']}>
          <motion.span
            variants={slideToView}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className={styles['hero-heading']}
          >
            Anoop
          </motion.span>

          <motion.div
            variants={slideToView}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="group relative h-[var(--hero-image-width)] w-[var(--hero-image-width)] flex-shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-white/5 p-1 shadow-2xl xl:h-[240px] xl:w-[240px]"
          >
            <Image
              src="/anoop-raju.jpg"
              className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
              alt="Anoop Raju"
              width={240}
              height={240}
              priority
            />
          </motion.div>

          <motion.span
            variants={slideToView}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className={styles['hero-heading']}
          >
            Raju
          </motion.span>
        </h1>

        <div className={styles['hero-subheading-container']}>
          <motion.p
            variants={slideToView}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className={styles['hero-subheading']}
          >
            Full Stack Developer
          </motion.p>
          <motion.p
            variants={slideToView}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className={styles['hero-subheading']}
          >
            Living in Kerala, India
          </motion.p>
        </div>

        {/* Scroll Down Cue */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 flex justify-center sm:mt-14 lg:mt-16"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-light-green sm:text-sm"
          >
            <span>Explore Projects</span>
            <FiArrowDown className="animate-bounce text-light-green" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
