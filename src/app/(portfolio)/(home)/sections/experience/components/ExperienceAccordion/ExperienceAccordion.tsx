'use client';

import { type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus } from 'react-icons/fa6';
import { FiCheckCircle } from 'react-icons/fi';
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch';
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector';
import { toggleAccordion } from '@/app/(portfolio)/features/accordionSlice';
import { Experience } from '@/utills/constants';
import styles from './styles.module.css';

interface Props extends Experience {
  index?: number;
}

const ExperienceAccordion: FC<Props> = ({ id, companyName, position, duration, description, index = 0 }) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.accordion.find((item) => item.id === id))?.isOpen ?? false;

  const toggle = () => dispatch(toggleAccordion({ id }));
  const indexDisplay = String(index + 1).padStart(2, '0');
  const isCurrent = duration.toLowerCase().includes('present');

  return (
    <div className={`${styles.card} ${styles.cardRegular}`} id={id}>
      <button type="button" onClick={toggle} aria-expanded={isOpen} className={styles.accordionHeader}>
        <div className={styles.leftInfo}>
          <div className={styles.indexRow}>
            <span className={styles.indexNumberRegular}>[{indexDisplay}]</span>
            <span className="text-white/40">ROLE &bull; CAREER</span>
          </div>

          <h3 className={`${styles.companyName} ${styles.companyNameRegular}`}>{companyName}</h3>

          <div className={styles.metaPillsRow}>
            <div className={`${styles.rolePill} ${styles.rolePillRegular}`}>
              {isCurrent && <span className={`${styles.roleDot} ${styles.roleDotRegular}`} />}
              <span>{position}</span>
            </div>

            <span className={`${styles.durationPill} ${styles.durationRegular}`}>{duration}</span>
          </div>
        </div>

        <div className={`${styles.toggleButton} ${styles.toggleButtonRegular}`}>
          <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            <FaPlus size={14} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`content-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.25, delay: 0.05 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.2 },
              },
            }}
            style={{ overflow: 'hidden' }}
            className={styles.bodyWrapper}
          >
            <div className="pt-6">
              <div className={`${styles.bodyContent} ${styles.bodyContentRegular}`}>
                <ul className={styles.achievementsList}>
                  {description.map((item, idx) => (
                    <li key={idx} className={styles.achievementItem}>
                      <FiCheckCircle size={16} className={`${styles.bulletIcon} ${styles.bulletIconRegular}`} />
                      <span className={styles.achievementTextRegular}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExperienceAccordion;
