'use client';

import { type FC } from 'react';
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch';
import { mouseEnter, mouseLeave } from '@/app/(portfolio)/features/textHoverSlice';
import styles from './skillItem.module.css';

type Props = {
  skill: string;
};

const SkillItemMask: FC<Props> = ({ skill }) => {
  const dispatch = useAppDispatch();

  const handleMouseEnter = () => dispatch(mouseEnter());
  const handleMouseLeave = () => dispatch(mouseLeave());

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.container}>
      <p className={styles['main-text-mask']}>{skill}</p>
    </div>
  );
};

export default SkillItemMask;
