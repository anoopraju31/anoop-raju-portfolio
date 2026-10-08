'use client';

import { cn } from '@/utills';
import { type FC } from 'react';
import { MotionValue, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import styles from './verticalSlide.module.css';

type VerticalSlideProps = {
  id: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
  img: string;
  name?: string;
  year?: string;
  deployedUrl?: string;
};

const VerticalSlide: FC<VerticalSlideProps> = (props) => {
  const { id, progress, range, targetScale, img, name, year, deployedUrl } = props;
  const scale = useTransform(progress, range, [1, targetScale]);
  const indexStr = String(id).padStart(2, '0');

  return (
    <div className={styles['outter-container']}>
      <motion.div
        style={{ top: `calc(-0% + ${id * 32}px)`, scale }}
        className={cn(styles['inner-container'], styles['inner-container-regular'])}
      >
        {/* Image and Gradient Background */}
        <div className={styles['img-container']}>
          <Image src={img} alt={name || img} width={1000} height={1000} priority className={styles.img} />
          <div className={styles['img-overlay-regular']} />
        </div>

        {/* Card Header Bar */}
        <div className={styles['card-header']}>
          <div className={cn(styles['index-pill'], styles['index-pill-regular'])}>
            <span className={styles['pulse-dot-regular']} />
            <span>
              [{indexStr} {'//'} FEATURED]
            </span>
          </div>

          {year && <span className={styles['year-badge-regular']}>{year}</span>}
        </div>

        {/* Card Footer Content */}
        <div className={styles['card-footer']}>
          {name && <h3 className={cn(styles['card-title'], styles['card-title-regular'])}>{name}</h3>}

          {deployedUrl && (
            <a
              href={deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(styles['action-button'], styles['action-button-regular'])}
            >
              <span>View Project</span>
              <FiArrowUpRight className={styles['action-arrow']} />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VerticalSlide;
