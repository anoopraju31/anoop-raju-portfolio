'use client';

import { type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus } from 'react-icons/fa6';
import { FiCheckCircle } from 'react-icons/fi';

import useAppDispatch from '@/hooks/useAddDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { mouseEnter, mouseLeave } from '@/redux/features/textHoverSlice';
import { toggleAccordion } from '@/redux/features/accordionSlice';
import { cn } from '@/utills';
import { Experience } from '@/utills/constants';

import styles from './styles.module.css';

interface Props extends Experience {
  index?: number;
}

const ExperienceAccordionMask: FC<Props> = ({ id, companyName, position, duration, description, index = 0 }) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.accordion.find((item) => item.id === id))?.isOpen ?? false;

  const handleMouseEnter = () => dispatch(mouseEnter());
  const handleMouseLeave = () => dispatch(mouseLeave());
  const toggle = () => dispatch(toggleAccordion({ id }));

  const indexDisplay = String(index + 1).padStart(2, '0');
  const isCurrent = duration.toLowerCase().includes('present');

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(styles.card, styles.cardMask)}
      id={`mask-${id}`}
    >
      <button type="button" onClick={toggle} aria-expanded={isOpen} className={styles.accordionHeader}>
        <div className={styles.leftInfo}>
          <div className={styles.indexRow}>
            <span className={styles.indexNumberMask}>[{indexDisplay}]</span>
            <span className="font-medium text-dark-blue/60">ROLE &bull; CAREER</span>
          </div>

          <h3 className={cn(styles.companyName, styles.companyNameMask)}>{companyName}</h3>

          <div className={styles.metaPillsRow}>
            <div className={cn(styles.rolePill, styles.rolePillMask)}>
              {isCurrent && <span className={cn(styles.roleDot, styles.roleDotMask)} />}
              <span>{position}</span>
            </div>

            <span className={cn(styles.durationPill, styles.durationMask)}>{duration}</span>
          </div>
        </div>

        <div className={cn(styles.toggleButton, styles.toggleButtonMask)}>
          <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            <FaPlus size={14} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`content-mask-${id}`}
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
              <div className={cn(styles.bodyContent, styles.bodyContentMask)}>
                <ul className={styles.achievementsList}>
                  {description.map((item, idx) => (
                    <li key={idx} className={styles.achievementItem}>
                      <FiCheckCircle size={16} className={cn(styles.bulletIcon, styles.bulletIconMask)} />
                      <span className={styles.achievementTextMask}>{item}</span>
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

export default ExperienceAccordionMask;
