'use client';

import { type FC } from 'react';

import useAppDispatch from '@/hooks/useAddDispatch';
import { mouseEnter, mouseLeave } from '@/redux/features/textHoverSlice';
import ExperienceAccordionMask from './ExperienceAccordion/ExperienceAccordionMask';
import { cn } from '@/utills';
import { accordionData } from '@/utills/constants';

import styles from './styles.module.css';

const ExperienceMask: FC = () => {
  const dispatch = useAppDispatch();

  const handleMouseEnter = () => dispatch(mouseEnter());
  const handleMouseLeave = () => dispatch(mouseLeave());

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.headingContainer}>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(styles.eyebrowBadge, styles.eyebrowBadgeMask)}
          >
            <span className={cn(styles.pulseDot, styles.pulseDotMask)} />
            <span>Career Trajectory &bull; 2022 &mdash; Present</span>
          </div>

          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <h2 className={cn(styles.heading, styles.headingMask)}>
              Work Experience <span className={styles.headingHighlightMask}>&amp; Roles</span>
            </h2>
          </div>

          <p
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(styles.subtitle, styles.subtitleMask)}
          >
            Demonstrated track record of architecting scalable frontend solutions, responsive web applications, and
            performance-driven interactive features.
          </p>

          {/* Timeline Highlights Bar */}
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.statsBar}>
            <div className={cn(styles.statItem, styles.statItemMask)}>
              <span className={styles.statNumberMask}>02+</span>
              <span>Years Experience</span>
            </div>
            <div className={cn(styles.statItem, styles.statItemMask)}>
              <span className={styles.statNumberMask}>Infigon Futures</span>
              <span>Aug 2024 &mdash; Present</span>
            </div>
            <div className={cn(styles.statItem, styles.statItemMask)}>
              <span className={styles.statNumberMask}>Tridashay</span>
              <span>Frontend Intern</span>
            </div>
          </div>
        </header>

        {/* Accordion Showcase List */}
        <div className={styles['outter-container']}>
          {accordionData.map((data, idx) => (
            <ExperienceAccordionMask key={data.id} index={idx} {...data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceMask;
