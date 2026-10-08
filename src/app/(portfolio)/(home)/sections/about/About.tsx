import { cn } from '@/utills';
import { type FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import styles from './about.module.css';

const About: FC = () => {
  return (
    <section className={styles.section} aria-label="about me">
      <div className={styles.container}>
        <div className={styles.gridContainer}>
          {/* Portrait Column */}
          <div className={styles.imageWrapper}>
            <div className={cn(styles.imageFrame, styles.imageFrameRegular)}>
              <Image
                src="/anoop-raju.jpg"
                alt="Anoop Raju"
                width={500}
                height={625}
                className={styles.image}
                priority
              />
            </div>
            <p className={cn(styles.imageCaption, styles.imageCaptionRegular)}>
              Kerala, IN &bull; SDE @ Infigon Futures
            </p>
          </div>

          {/* Story Column */}
          <div className={styles.contentWrapper}>
            <div className={cn(styles.tagline, styles.taglineRegular)}>
              <span>[ 02 // BACKGROUND ]</span>
            </div>

            <h2 className={cn(styles.heading, styles.headingRegular)}>
              About Me<span className={styles.headingDotRegular}>.</span>
            </h2>

            <div className={styles.paragraphs}>
              <p className={styles.paragraphRegular}>
                Hello! I&apos;m <strong className="font-semibold text-white">Anoop Raju</strong>, a passionate Software
                Developer specialized in building sleek, scalable frontend applications. With an eye for clean UI design
                and a dedication to seamless user experiences, I turn ideas into visually engaging, functional digital
                realities.
              </p>

              <p className={styles.paragraphRegular}>
                As a graduate of the{' '}
                <strong className="font-semibold text-white">
                  Indian Institute of Information Technology, Kottayam
                </strong>
                , I&apos;ve honed my craft in both the theoretical and practical foundations of web engineering.
                Currently crafting frontend solutions at Infigon Futures, I focus on modern React ecosystems,
                TypeScript, performance, and modular design.
              </p>

              <p className={styles.paragraphRegular}>
                When I&apos;m not coding, you&apos;ll find me exploring modern design trends, experimenting with
                interactive web technologies, and finding creative ways to elevate the digital experience.
              </p>
            </div>

            <div className={cn(styles.linkContainer, styles.linkContainerRegular)}>
              <Link href="/contact" className={cn(styles.contactLink, styles.contactLinkRegular)}>
                <span>Let&apos;s build something together</span>
                <FiArrowUpRight size={16} className={styles.arrowIcon} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
