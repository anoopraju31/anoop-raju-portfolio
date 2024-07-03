'use client'

import useAppDispatch from '@/app/hooks/useAddDispatch'
import { motion } from 'framer-motion'
import {
	projectCardMouseEnter,
	projectCardMouseLeave,
} from '@/app/features/projectCardSlice'
import styles from './horizontalSlide.module.css'

type SlideLgMaskProps = {
	id: number
}
const HorizontalSlideMask = (props: SlideLgMaskProps) => {
	const { id } = props
	const dispatch = useAppDispatch()

	const handleCardHoverStart = (id: number) =>
		dispatch(projectCardMouseEnter(id))
	const handleCardHoverEnd = () => dispatch(projectCardMouseLeave())

	const initial = { opacity: 0, y: 0, width: '20vw' }
	const animateOnhover = { width: '100vw' }
	const transition = { duration: 0.4, ease: 'easeOut' }

	return (
		<motion.div
			initial={initial}
			whileHover={animateOnhover}
			transition={transition}
			onHoverStart={() => handleCardHoverStart(id)}
			onHoverEnd={handleCardHoverEnd}
			className={styles.container}
		/>
	)
}

export default HorizontalSlideMask
