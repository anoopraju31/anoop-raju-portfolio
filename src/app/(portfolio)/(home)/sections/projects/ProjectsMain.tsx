'use client';

import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import Lenis from '@studio-freight/lenis';
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch';
import { projectCardMouseLeave } from '@/app/(portfolio)/features/projectCardSlice';
import HorizontalSlide from './components/horizontalSlide/HorizontalSlide';
import VerticalSlide from './components/veticalSlide/VerticalSlide';
import { projects } from '@/utills/constants';
import styles from './styles.module.css';

const ProjectsMain = () => {
  const dispatch = useAppDispatch();
  const container = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    layoutEffect: false,
    target: container,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const lenis = new Lenis();

    // @ts-ignore
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <section ref={container} className={styles.projects}>
      {/* For Large Screen */}
      <div className={styles.container}>
        {projects.map(({ id, img, name, year, deployedUrl }) => {
          const targetScale = 1 - (projects.length - id) * 0.05;
          return (
            <VerticalSlide
              key={id}
              id={id}
              img={img}
              name={name}
              year={year}
              deployedUrl={deployedUrl}
              progress={scrollYProgress}
              range={[id * 0.16, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

      {/* For Large Screen (Desktop Horizontal Accordion) */}
      <div className={styles['container-mdlg']} onMouseLeave={() => dispatch(projectCardMouseLeave())}>
        {projects.map(({ id, img, name, year, deployedUrl, tools }) => {
          return (
            <HorizontalSlide
              key={id}
              id={id}
              img={img}
              name={name}
              year={year}
              deployedUrl={deployedUrl}
              tools={tools}
            />
          );
        })}
      </div>

      <div className={styles['all-projects-container']}>
        <Link href="/projects" className={styles['all-projects-link-body']}>
          <span>View More Projects</span>
          <FiArrowRight size={18} className={styles.arrowIcon} />
        </Link>
      </div>
    </section>
  );
};

export default ProjectsMain;
