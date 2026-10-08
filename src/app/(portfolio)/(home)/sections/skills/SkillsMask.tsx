'use client';

import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch';
import { mouseEnter, mouseLeave } from '@/app/(portfolio)/features/textHoverSlice';
import SkillsContainerMask from './components/skillsContainer/SkillsContainerMask';
import { services, skills } from '@/utills/constants';

import styles from './styles.module.css';

const SkillsMask = () => {
  const dispatch = useAppDispatch();

  const handleMouseEnter = () => dispatch(mouseEnter());
  const handleMouseLeave = () => dispatch(mouseLeave());

  return (
    <div className={styles.section} aria-label="skills mask">
      <div className={styles.container}>
        <header className={styles.headingContainer}>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`${styles.eyebrowBadge} ${styles.eyebrowBadgeMask}`}
          >
            <span className={`${styles.pulseDot} ${styles.pulseDotMask}`} />
            <span>Capabilities &bull; Disciplines &amp; Stack</span>
          </div>

          <h2
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`${styles.heading} ${styles.headingMask}`}
          >
            Services <span className={styles.headingHighlightMask}>&amp; Skills</span>
          </h2>

          <p
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`${styles.subtitle} ${styles.subtitleMask}`}
          >
            A breakdown of specialized design and web engineering services, paired with my go-to technology stack for
            creating impactful digital experiences.
          </p>
        </header>

        <div className={styles.blocksWrapper}>
          <SkillsContainerMask
            title="my expertises."
            description="I focus on all things design and web related. With each of my
									services, my goal is to deliver an impactful and elevating
									digital experience for everyone."
            skills={services}
          />

          <SkillsContainerMask
            title="my digital tool box."
            description="These are my go to tech stack to make any projects happen. I am
									always eager of learning more about my current stack, and new
									technologies that could expand my horizons."
            skills={skills}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillsMask;
