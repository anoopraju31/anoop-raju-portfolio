'use client';

import { type FC } from 'react';

import useAppDispatch from '@/hooks/useAddDispatch';
import { mouseEnter, mouseLeave } from '@/redux/features/textHoverSlice';
import { cn } from '@/utills';
import SkillItemMask from '../skillItem/SkillItemMask';

import styles from './styles.module.css';

type Props = {
  title: string;
  description: string;
  skills: string[];
  index?: number;
};

const SkillsContainerMask: FC<Props> = ({
  title,
  description,
  skills,
  // index = 1
}) => {
  const dispatch = useAppDispatch();
  // const indexStr = String(index).padStart(2, '0');

  const handleMouseEnter = () => dispatch(mouseEnter());
  const handleMouseLeave = () => dispatch(mouseLeave());

  return (
    <div className={styles['text-container']}>
      <div className={styles['left-text-outter-container']}>
        <div className={styles['left-text-inner-container']}>
          {/* <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles['index-tag-mask']}>
            [{indexStr}] &bull; FOCUS
          </div> */}
          <h3
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(styles['left-text-container-header'], styles['left-header-mask'])}
          >
            {title}
          </h3>
          <p
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(styles['left-text-container-body'], styles['left-body-mask'])}
          >
            {description}
          </p>
        </div>
      </div>

      <div className={styles['skills-container']}>
        {skills.map((skill, idx) => (
          <SkillItemMask key={idx} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillsContainerMask;
