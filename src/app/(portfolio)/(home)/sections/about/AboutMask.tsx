'use client';

import { type FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch';
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector';
import { mouseEnter, mouseLeave } from '@/redux/features/textHoverSlice';
import { cn } from '@/utills';

import styles from './about.module.css';

const AboutMask: FC = () => {
  const dispatch = useAppDispatch();
  const currentCardId = useAppSelector((state) => state.projectCardHover.cardId);

  const handleMouseEnter = () => dispatch(mouseEnter());
  const handleMouseLeave = () => dispatch(mouseLeave());

  return (
    <div className={cn(styles.section, currentCardId ? 'invisible' : '')} aria-label="about me mask">
      <div className={styles.container}>
        <div className={styles.gridContainer}>
          {/* Portrait Column */}
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.imageWrapper}>
            <div className={cn(styles.imageFrame, styles.imageFrameMask)}>
              <Image
                src="/anoop-raju.jpg"
                alt="Anoop Raju"
                width={500}
                height={625}
                className={cn(styles.image, 'invert filter')}
                priority
              />
            </div>
            <p className={cn(styles.imageCaption, styles.imageCaptionMask)}>Kerala, IN &bull; SDE @ Infigon Futures</p>
          </div>

          {/* Story Column */}
          <div className={styles.contentWrapper}>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={cn(styles.tagline, styles.taglineMask)}
            >
              <span>[ 02 // BACKGROUND ]</span>
            </div>

            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <h2 className={cn(styles.heading, styles.headingMask)}>
                About Me<span className={styles.headingDotMask}>.</span>
              </h2>
            </div>

            <div className={styles.paragraphs}>
              <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.paragraphMask}>
                Hello! I&apos;m <strong className="font-bold text-dark-blue">Anoop Raju</strong>, a passionate Software
                Developer specialized in building sleek, scalable frontend applications. With an eye for clean UI design
                and a dedication to seamless user experiences, I turn ideas into visually engaging, functional digital
                realities.
              </p>

              <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.paragraphMask}>
                As a graduate of the{' '}
                <strong className="font-bold text-dark-blue">
                  Indian Institute of Information Technology, Kottayam
                </strong>
                , I&apos;ve honed my craft in both the theoretical and practical foundations of web engineering.
                Currently crafting frontend solutions at Infigon Futures, I focus on modern React ecosystems,
                TypeScript, performance, and modular design.
              </p>

              <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.paragraphMask}>
                When I&apos;m not coding, you&apos;ll find me exploring modern design trends, experimenting with
                interactive web technologies, and finding creative ways to elevate the digital experience.
              </p>
            </div>

            <div className={cn(styles.linkContainer, styles.linkContainerMask)}>
              <Link
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                href="/contact"
                className={cn(styles.contactLink, styles.contactLinkMask)}
              >
                <span>Let&apos;s build something together</span>
                <FiArrowUpRight size={16} className={styles.arrowIcon} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMask;
