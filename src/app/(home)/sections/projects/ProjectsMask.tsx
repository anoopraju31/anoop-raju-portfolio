'use client'

import { useEffect, useRef } from 'react'
import { useScroll } from 'framer-motion'
import useAppDispatch from '@/app/hooks/useAddDispatch'
import useAppSelector from '@/app/hooks/useAppSelector'
import Link from 'next/link'
import Lenis from '@studio-freight/lenis'
import VerticalSlideMask from './components/veticalSlide/VerticalSlideMask'
import HorizontalSlideMask from './components/horizontalSlide/HorizontalSlideMask'
import { mouseEnter, mouseLeave } from '@/app/features/textHoverSlice'
import { projects } from '@/utills/constants'
import styles from './styles.module.css'

const ProjectsMask = () => {
	const container = useRef<HTMLDivElement | null>(null)
	const { scrollYProgress } = useScroll({
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
		<section className={styles.projects}>
			{/* Mask for small screen */}
			<div className={styles.container}>
				{projects.map(({ id }) => {
					const targetScale = 1 - (projects.length - id) * 0.05
					return (
						<VerticalSlideMask
							key={id}
							id={id}
							progress={scrollYProgress}
							range={[id * 0.16, 1]}
							targetScale={targetScale}
						/>
					)
				})}
			</div>

			{/* Mask for large screen */}
			<div className={styles['container-mdlg']}>
				{projects.map(({ id, deployedUrl }) => (
					<HorizontalSlideMask deployedUrl={deployedUrl} key={id} id={id} />
				))}
			</div>

			<ViewMoreProject />
		</section>
	)
}

const ViewMoreProject = () => {
	const dispatch = useAppDispatch()
	const currentCardId = useAppSelector((state) => state.projectCardHover.cardId)
	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())

	return (
		<div
			className={`${styles['all-projects-container']} ${
				currentCardId && 'invisible'
			}`}>
			<Link
				href='/projects'
				className={styles['all-projects-link-mask']}
				// onMouseEnter={handleMouseEnter}
				// onMouseLeave={handleMouseLeave}
			>
				View More Projects
			</Link>
		</div>
	)
}

export default ProjectsMask
