'use client'

import { MotionValue, useTransform, motion } from 'framer-motion'
import styles from './verticalSlide.module.css'

type VerticalSlideMaskProps = {
	id: number
	progress: MotionValue<number>
	range: number[]
	targetScale: number
}

const VerticalSlideMask = (props: VerticalSlideMaskProps) => {
	const { id, progress, range, targetScale } = props
	const scale = useTransform(progress, range, [1, targetScale])

	return (
		<div className={styles['outter-container']}>
			<motion.div
				style={{ top: `calc(-0% + ${id * 35}px)`, scale }}
				className={styles['inner-container']}
			/>
		</div>
	)
}

export default VerticalSlideMask
