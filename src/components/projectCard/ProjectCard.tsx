'use client'

import { Ref, useEffect, useState } from 'react'
import { useMouse } from '@uidotdev/usehooks'
import { motion } from 'framer-motion'
import { GoArrowUpRight } from 'react-icons/go'
import Image from 'next/image'
import styles from './projectCard.module.css'

const ProjectCard = ({ img }: { img: string }) => {
	const [hover, setHover] = useState(false)

	const [mouse, ref] = useMouse()
	const { elementX, elementY } = mouse

	const handleMouseEnter = () => setHover(true)
	const handleMouseLeave = () => setHover(false)

	useEffect(() => {
		const container = ref.current
		if (!container) return

		container.addEventListener('mouseenter', handleMouseEnter)
		container.addEventListener('mouseleave ', handleMouseLeave)

		return () => {
			container.removeEventListener('mouseenter', handleMouseEnter)
			container.removeEventListener('mouseleave ', handleMouseLeave)
		}
	}, [ref])

	return (
		<div
			ref={ref as Ref<HTMLDivElement> | undefined}
			className={styles['project-card']}>
			{hover && (
				<motion.div
					className={styles.cursor}
					animate={{
						opacity: 1,
						backgroundColor: '#fff',
						color: '#000',
						height: 60,
						width: 60,
						fontSize: '18px',
						x: elementX - 30,
						y: elementY - 30,
					}}
					transition={{ type: 'tween', ease: 'backOut', duration: 0.01 }}>
					<span className={styles.cursorText}>
						<GoArrowUpRight />
					</span>
				</motion.div>
			)}

			<Image
				className={styles.img}
				src={img}
				alt='eat curious'
				width={1000}
				height={1000}
			/>
		</div>
	)
}

export default ProjectCard
