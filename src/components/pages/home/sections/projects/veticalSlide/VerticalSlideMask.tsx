'use client';

import { type FC } from 'react';
import { MotionValue, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';

import useAppDispatch from '@/hooks/useAddDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { mouseEnter, mouseLeave } from '@/redux/features/textHoverSlice';
import { projectCardMouseEnter, projectCardMouseLeave } from '@/redux/features/projectCardSlice';
import { cn } from '@/utills';

import styles from './verticalSlide.module.css';

type VerticalSlideMaskProps = {
  id: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
  img?: string;
  name?: string;
  year?: string;
  deployedUrl?: string;
};

const VerticalSlideMask: FC<VerticalSlideMaskProps> = (props) => {
  const { id, progress, range, targetScale, img, name, year, deployedUrl } = props;
  const dispatch = useAppDispatch();
  const currentCardId = useAppSelector((state) => state.projectCardHover.cardId);
  const scale = useTransform(progress, range, [1, targetScale]);
  const indexStr = String(id).padStart(2, '0');

  const handleMouseEnter = () => dispatch(mouseEnter());
  const handleMouseLeave = () => dispatch(mouseLeave());

  const handleImageMouseMove = () => {
    if (deployedUrl && currentCardId !== id) {
      dispatch(projectCardMouseEnter({ cardId: id, link: deployedUrl }));
    }
  };
  const handleImageMouseLeave = () => dispatch(projectCardMouseLeave());
  const handleImageClick = () => {
    if (deployedUrl) window.open(deployedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles['outter-container']}>
      <motion.div
        style={{ top: `calc(-0% + ${id * 32}px)`, scale }}
        className={cn(styles['inner-container'], styles['inner-container-mask'])}
      >
        {/* Image and Gradient Background */}
        {img && (
          <div
            onClick={handleImageClick}
            onMouseMove={handleImageMouseMove}
            onMouseLeave={handleImageMouseLeave}
            className={cn(styles['img-container'], 'cursor-none')}
          >
            <Image src={img} alt={name || img} width={1000} height={1000} priority className={styles.img} />
            <div className={styles['img-overlay-mask']} />
          </div>
        )}

        {/* Card Header Bar */}
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles['card-header']}>
          <div className={cn(styles['index-pill'], styles['index-pill-mask'])}>
            <span className={styles['pulse-dot-mask']} />
            <span>
              [{indexStr} {'//'} FEATURED]
            </span>
          </div>

          {year && <span className={styles['year-badge-mask']}>{year}</span>}
        </div>

        {/* Card Footer Content */}
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles['card-footer']}>
          {name && <h3 className={cn(styles['card-title'], styles['card-title-mask'])}>{name}</h3>}

          {deployedUrl && (
            <a
              href={deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(styles['action-button'], styles['action-button-mask'])}
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

export default VerticalSlideMask;
