'use client'

import { useEffect, useRef } from 'react'
import { useScroll } from 'framer-motion'
import Link from 'next/link'
import Lenis from '@studio-freight/lenis'
import HorizontalSlide from './components/horizontalSlide/HorizontalSlide'
import VerticalSlide from './components/veticalSlide/VerticalSlide'
import { projects } from '@/utills/constants'
import styles from './styles.module.css'

const ProjectsMain = () => {
	const container = useRef<HTMLElement | null>(null)
	const { scrollYProgress } = useScroll({
		layoutEffect: false,
		target: container,
		offset: ['start start', 'end end'],
	})

	useEffect(() => {
		const lenis = new Lenis()

		// @ts-ignore
		function raf(time) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}

		requestAnimationFrame(raf)
	})

	return (
		<section ref={container} className={styles.projects}>
			{/* For Large Screen */}
			<div className={styles.container}>
				{projects.map(({ id, img }) => {
					const targetScale = 1 - (projects.length - id) * 0.05
					return (
						<VerticalSlide
							key={id}
							id={id}
							img={img}
							progress={scrollYProgress}
							range={[id * 0.16, 1]}
							targetScale={targetScale}
						/>
					)
				})}
			</div>

			{/* For Small Screen */}
			<div className={styles['container-mdlg']}>
				{projects.map(({ id, img, name, year }) => {
					return (
						<HorizontalSlide
							key={id}
							id={id}
							img={img}
							name={name}
							year={year}
						/>
					)
				})}
			</div>

			<div className={styles['all-projects-container']}>
				<Link href='/projects' className={styles['all-projects-link-body']}>
					View More Projects
				</Link>
			</div>
		</section>
	)
}

export default ProjectsMain
