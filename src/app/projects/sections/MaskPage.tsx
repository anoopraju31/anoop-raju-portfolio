'use client'

import { useMouse } from '@uidotdev/usehooks'
import { Ref, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './projects.module.css'

const MaskPage = () => {
	const [isHover, setIshover] = useState<boolean>(false)
	const [mouse, ref] = useMouse()
	const { x, y } = mouse
	const size = isHover ? 120 : 60

	const handleMouseEnter = () => setIshover(true)
	const handleMouseLeave = () => setIshover(false)

	return (
		<motion.div
			ref={ref as Ref<HTMLDivElement> | undefined}
			initial={{
				WebkitMaskPosition: '-100px -100px',
				WebkitMaskSize: '0px',
			}}
			animate={{
				WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
				WebkitMaskSize: `${size}px`,
			}}
			transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
			className={styles.mask}>
			<section className={styles.section}>
				<div className={styles['heading-container']}>
					<h1
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={styles.heading}>
						All Portfolio
					</h1>
				</div>

				<div className={styles['projects-container']}>
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
				</div>
			</section>
		</motion.div>
	)
}

export default MaskPage
