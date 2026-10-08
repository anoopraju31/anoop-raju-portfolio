'use client';

import Image from 'next/image';
import { FiArrowDown } from 'react-icons/fi';
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch';
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector';
import { mouseEnter, mouseLeave } from '@/app/(portfolio)/features/textHoverSlice';
import styles from './hero.module.css';

const HeroMask = () => {
  const dispatch = useAppDispatch();
  const currentCardId = useAppSelector((state) => state.projectCardHover.cardId);

  const handleMouseEnter = () => dispatch(mouseEnter());
  const handleMouseLeave = () => dispatch(mouseLeave());

  return (
    <div className={`${styles.mask} ${currentCardId && 'invisible'}`}>
      <div className={styles['hero-container']}>
        {/* Status Eyebrow Badge */}
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="mb-1 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-dark-blue/40 bg-dark-blue/[0.08] px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-dark-blue shadow-sm sm:text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-dark-blue" />
            <span>Available for Worldwide Opportunities</span>
          </div>
        </div>

        <div className={styles['hero-heading-container']}>
          <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles['hero-heading']}>
            Anoop
          </span>

          {/* Inverted Avatar Image */}
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative h-[var(--hero-image-width)] w-[var(--hero-image-width)] flex-shrink-0 overflow-hidden rounded-full border-2 border-dark-blue/30 bg-dark-blue/10 p-1 shadow-2xl xl:h-[240px] xl:w-[240px]"
          >
            <Image
              src="/anoop-raju.jpg"
              className="h-full w-full rounded-full object-cover invert filter"
              alt="Anoop Raju"
              width={240}
              height={240}
              priority
            />
          </div>

          <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles['hero-heading']}>
            Raju
          </span>
        </div>

        <div className={styles['hero-subheading-container']}>
          <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles['hero-subheading']}>
            Full Stack Developer
          </span>
          <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles['hero-subheading']}>
            Living in Kerala, India
          </span>
        </div>

        {/* Scroll Down Cue */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="mt-6 flex justify-center sm:mt-8"
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-dark-blue sm:text-sm">
            <span>Explore Projects</span>
            <FiArrowDown className="animate-bounce text-dark-blue" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMask;
