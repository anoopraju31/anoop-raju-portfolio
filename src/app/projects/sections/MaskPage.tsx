'use client'

import { useMouse } from '@uidotdev/usehooks'
import { Ref } from 'react'
import { motion } from 'framer-motion'
import styles from './projects.module.css'

const MaskPage = () => {
	const [mouse, ref] = useMouse()
	const { x, y } = mouse

	return (
		<motion.div
			ref={ref as Ref<HTMLDivElement> | undefined}
			animate={{
				WebkitMaskPosition: `${x - 30}px ${y - 30}px`,
				WebkitMaskSize: `60px`,
			}}
			transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
			className={styles.mask}>
			<section className={styles.section}>
				<div className={styles['heading-container']}>
					<h1 className={styles.heading}>All Portfolio</h1>
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
