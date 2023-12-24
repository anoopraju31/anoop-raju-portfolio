'use client'

import useAppSelector from '@/app/hooks/useAppSelector'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './horizontalSlide.module.css'

type HorizontalSlideProps = {
	id: number
	img: string
}

const HorizontalSlide = (props: HorizontalSlideProps) => {
	const { id, img } = props
	const currentCardId = useAppSelector((state) => state.projectCardHover.cardId)

	const initial = {
		opacity: 0,
		y: 0,
		width: '20vw',
	}
	const animate = {
		width: id === currentCardId ? '100vw' : '20vw',
	}
	const inViewAnimation = {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.73, 0.06, 0.42, 0.835],
		},
	}
	const viewPort = { once: true }
	const transition = { duration: 0.4, ease: 'easeOut' }

	return (
		<motion.div
			initial={initial}
			whileInView={inViewAnimation}
			animate={animate}
			viewport={viewPort}
			transition={transition}
			className={styles.container}>
			<Image
				src={img}
				alt={img}
				width={1000}
				height={1000}
				priority
				className={styles.img}
			/>
		</motion.div>
	)
}

export default HorizontalSlide
