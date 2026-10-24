'use client';

import { type FC, useRef } from 'react';
import { useTransform, motion, useScroll, cubicBezier } from 'framer-motion';

import styles from './skillItem.module.css';

type Props = {
  skill: string;
};

const SkillItem: FC<Props> = ({ skill }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    layoutEffect: false,
    target: container,
    offset: ['start 0.9', 'start 0.25'],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
    {
      ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
    }
  );

  return (
    <div ref={container} className={styles.container}>
      <motion.p style={{ clipPath }} className={styles['mask-text']}>
        {skill}
      </motion.p>
      <p className={styles['main-text']}>{skill}</p>
    </div>
  );

};

export default SkillItem;
