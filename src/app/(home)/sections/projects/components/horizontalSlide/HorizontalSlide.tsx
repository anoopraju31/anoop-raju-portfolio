'use client'

import useAppSelector from '@/app/hooks/useAppSelector'
import { motion } from 'framer-motion'
import ProjectCard from '../projectCard/ProjectCard'
import styles from './horizontalSlide.module.css'

type HorizontalSlideProps = {
	id: number
	img: string
	name: string
	year: string
}

const HorizontalSlide = (props: HorizontalSlideProps) => {
	const { id } = props
	const currentCardId = useAppSelector((state) => state.projectCardHover.cardId)
	const initial = { opacity: 0, y: 0, width: '20vw' }
	const animate = { width: id === currentCardId ? '100vw' : '20vw' }
	const inViewAnimation = {
		opacity: 1,
		y: 0,
		transition: { duration: 1, ease: [0.17, 0.67, 0.83, 0.67] },
	}
	const viewPort = { once: true }
	const transition = { duration: 1.5, ease: 'backOut' }

	return (
		<motion.div
			initial={initial}
			whileInView={inViewAnimation}
			animate={animate}
			viewport={viewPort}
			transition={transition}
			className={styles.container}>
			<ProjectCard {...props} />
		</motion.div>
	)
}

export default HorizontalSlide
