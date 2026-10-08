import { type FC } from 'react';
import SkillItem from '../skillItem/SkillItem';
import styles from './styles.module.css';

type Props = {
  title: string;
  description: string;
  skills: string[];
  index?: number;
};

const SkillsContainer: FC<Props> = ({ title, description, skills, index = 1 }) => {
  const indexStr = String(index).padStart(2, '0');

  return (
    <div className={styles['text-container']}>
      <div className={styles['left-text-outter-container']}>
        <div className={styles['left-text-inner-container']}>
          <div className={styles['index-tag-regular']}>[{indexStr}] &bull; FOCUS</div>
          <h3 className={`${styles['left-text-container-header']} ${styles['left-header-regular']}`}>{title}</h3>
          <p className={`${styles['left-text-container-body']} ${styles['left-body-regular']}`}>{description}</p>
        </div>
      </div>

      <div className={styles['skills-container']}>
        {skills.map((skill, idx) => (
          <SkillItem key={idx} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillsContainer;
