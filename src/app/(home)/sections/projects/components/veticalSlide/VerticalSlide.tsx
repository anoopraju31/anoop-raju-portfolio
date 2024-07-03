'use client'

import { MotionValue, useTransform, motion } from 'framer-motion'
import Image from 'next/image'
import styles from './verticalSlide.module.css'

type VerticalSlideProps = {
	id: number
	progress: MotionValue<number>
	range: number[]
	targetScale: number
	img: string
}

const VerticalSlide = (props: VerticalSlideProps) => {
	const { id, progress, range, targetScale, img } = props
	const scale = useTransform(progress, range, [1, targetScale])

	return (
		<div className={styles['outter-container']}>
			<motion.div
				style={{ top: `calc(-0% + ${id * 35}px)`, scale }}
				className={styles['inner-container']}>
				<div className={styles['img-container']}>
					<Image
						src={img}
						alt={img}
						width={1000}
						height={1000}
						priority
						className={styles.img}
					/>
				</div>
			</motion.div>
		</div>
	)
}

export default VerticalSlide
