'use client'

import { useRef } from 'react'
import { useTransform, motion, useScroll, cubicBezier } from 'framer-motion'
import styles from './skillItem.module.css'

type Props = {
	skill: string
}

const SkillItem = (props: Props) => {
	const { skill } = props

	const container = useRef<HTMLDivElement | null>(null)
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start 0.9', 'start 0.25'],
	})
	const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'], {
		ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
	})

	return (
		<div ref={container} className={styles.container}>
			<motion.p style={{ width }} className={styles['mask-text']}>
				{skill}
			</motion.p>
			<p className={styles['main-text']}>{skill}</p>
		</div>
	)
}

export default SkillItem
