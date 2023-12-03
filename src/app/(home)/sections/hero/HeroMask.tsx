'use client'

import { useState } from 'react'
import useMousePosition from '@/app/hooks/useMousePostion'
import { motion } from 'framer-motion'
import { maskAnimation, maskTransition } from '@/utills/animations'
import styles from './hero.module.css'

const HeroMask = () => {
	const [isHovered, setIsHovered] = useState(false)
	const { x, y } = useMousePosition()

	const size = isHovered ? 300 : 40

	const handleMouseEnter = () => setIsHovered(true)
	const handleMouseEnterImage = () => setIsHovered(false)
	const handleMouseLeave = () => setIsHovered(false)
	const handleMouseLeaveImage = () => setIsHovered(true)

	return (
		<motion.div
			animate={maskAnimation(x, y, size)}
			transition={maskTransition}
			className={styles.mask}>
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className={styles['hero-container']}>
				<div className={styles['hero-heading-container']}>
					<h1 className={styles['hero-heading']}>Anoop</h1>

					<div
						onMouseEnter={handleMouseEnterImage}
						onMouseLeave={handleMouseLeaveImage}
						className={styles['hero-image']}
					/>
					<h1 className={styles['hero-heading']}>Raju</h1>
				</div>

				<div className={styles['hero-subheading-container']}>
					<h2 className={styles['hero-subheading']}>Web Developer</h2>
					<h2 className={styles['hero-subheading']}>Living in Kerala</h2>
				</div>
			</div>
		</motion.div>
	)
}

export default HeroMask
