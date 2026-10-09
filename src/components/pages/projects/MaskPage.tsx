'use client';

import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

import useAppDispatch from '@/hooks/useAddDispatch';
import { mouseEnter, mouseLeave } from '@/redux/features/textHoverSlice';
import { cn } from '@/utills';
import Mask from '@/components/mask';
// import MagneticContainer from '@/components/MagneticContainer';
import { projectsList } from '@/constants/projectsData';
import MaskProductCard from './projectCard/mask';

import styles from './projects.module.css';

const gridContainerClasses = [
  styles.project1__container,
  styles.project2__container,
  styles.project3__container,
  styles.project4__container,
  styles.project5__container,
];

const MaskPage = () => {
  const dispatch = useAppDispatch();

  const handleMouseEnter = () => dispatch(mouseEnter());
  const handleMouseLeave = () => dispatch(mouseLeave());

  return (
    <div className="absolute left-0 right-0 top-0 w-full">
      <Mask>
        <div className={styles.maskPage}>
          <div className={styles.container}>
            {/* Hero Header Section */}
            <header className={styles.heroSection}>
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(styles.eyebrowBadge, styles.eyebrowBadgeMask)}
              >
                <span className={cn(styles.pulseDot, styles.pulseDotMask)} />
                <span>Selected Works &bull; 2023 &mdash; Present</span>
              </div>

              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <h1 className={cn(styles.mainHeading, styles.headingMask)}>
                  Featured Work <span className={styles.headingHighlightMask}>&amp; Systems</span>
                </h1>
              </div>

              <p
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(styles.heroSubtitle, styles.heroSubtitleMask)}
              >
                A curated collection of full-stack web applications, bespoke user interfaces, and generative digital
                experiments engineered with performance, accessibility, and kinetic craft.
              </p>

              {/* Quick Metrics Bar */}
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.statsBar}>
                <div className={cn(styles.statItem, styles.statItemMask)}>
                  <span className={styles.statNumberMask}>05</span>
                  <span>Curated Builds</span>
                </div>
                <div className={cn(styles.statItem, styles.statItemMask)}>
                  <span className={styles.statNumberMask}>100%</span>
                  <span>TypeScript</span>
                </div>
                <div className={cn(styles.statItem, styles.statItemMask)}>
                  <span className={styles.statNumberMask}>React &bull; Next.js</span>
                  <span>Core Stack</span>
                </div>
                <div className={cn(styles.statItem, styles.statItemMask)}>
                  <span className={styles.statNumberMask}>OpenAI &bull; WebGL</span>
                  <span>Integrations</span>
                </div>
              </div>
            </header>

            {/* Asymmetrical Project Showcase Grid */}
            <div className={styles.project__container}>
              {projectsList.map((project, index) => {
                const containerClass = gridContainerClasses[index] || styles.project1__container;
                return (
                  <div key={project.id} className={containerClass}>
                    <MaskProductCard
                      id={project.id}
                      number={project.number}
                      name={project.name}
                      subtitle={project.subtitle}
                      description={project.description}
                      img={project.img}
                      alt={project.alt}
                      link={project.link}
                      github={project.github}
                      year={project.year}
                      category={project.category}
                      tools={project.tools}
                      featured={project.featured}
                      siteDomain={project.siteDomain}
                    />
                  </div>
                );
              })}
            </div>

            {/* Bottom Call To Action Banner */}
            <section className={cn(styles.bottomCtaSection, styles.bottomCtaSectionMask)}>
              <span
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(styles.ctaEyebrow, styles.ctaEyebrowMask)}
              >
                Have a vision in mind?
              </span>
              <h2
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(styles.ctaTitle, styles.ctaTitleMask)}
              >
                Let&apos;s build something extraordinary together
              </h2>
              <p
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(styles.ctaDescription, styles.ctaDescriptionMask)}
              >
                Available for select freelance contracts, high-impact frontend roles, and creative software
                collaborations.
              </p>
              <div className={styles.ctaButtonWrapper}>
                <Link
                  href="/contact"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className={cn(styles.ctaButton, styles.ctaButtonMask)}
                >
                  <span>Start a Conversation</span>
                  <FiArrowUpRight size={18} />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </Mask>
    </div>
  );
};

export default MaskPage;
