import { FC } from 'react';

import { cn } from '@/utills';
import { accordionData } from '@/utills/constants';
import ExperienceAccordion from './ExperienceAccordion/ExperienceAccordion';

import styles from './styles.module.css';

const Experience: FC = () => {
  return (
    <section className={styles.section} aria-label="experience">
      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.headingContainer}>
          <div className={cn(styles.eyebrowBadge, styles.eyebrowBadgeRegular)}>
            <span className={cn(styles.pulseDot, styles.pulseDotRegular)} />
            <span>Career Trajectory &bull; 2022 &mdash; Present</span>
          </div>

          <h2 className={cn(styles.heading, styles.headingRegular)}>
            Work Experience <span className={styles.headingHighlightRegular}>&amp; Roles</span>
          </h2>

          <p className={cn(styles.subtitle, styles.subtitleRegular)}>
            Demonstrated track record of architecting scalable frontend solutions, responsive web applications, and
            performance-driven interactive features.
          </p>

          {/* Timeline Highlights Bar */}
          <div className={styles.statsBar}>
            <div className={cn(styles.statItem, styles.statItemRegular)}>
              <span className={styles.statNumberRegular}>02+</span>
              <span>Years Experience</span>
            </div>
            <div className={cn(styles.statItem, styles.statItemRegular)}>
              <span className={styles.statNumberRegular}>Infigon Futures</span>
              <span>Aug 2024 &mdash; Present</span>
            </div>
            <div className={cn(styles.statItem, styles.statItemRegular)}>
              <span className={styles.statNumberRegular}>Tridashay</span>
              <span>Frontend Intern</span>
            </div>
          </div>
        </header>

        {/* Accordion Showcase List */}
        <div className={styles['outter-container']}>
          {accordionData.map((data, idx) => (
            <ExperienceAccordion key={data.id} index={idx} {...data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
