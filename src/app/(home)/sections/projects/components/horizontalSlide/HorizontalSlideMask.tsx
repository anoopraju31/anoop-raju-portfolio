'use client'

import useAppDispatch from '@/app/hooks/useAddDispatch'
import useAppSelector from '@/app/hooks/useAppSelector'
import { motion } from 'framer-motion'
import {
	projectCardMouseEnter,
	projectCardMouseLeave,
} from '@/app/features/projectCardSlice'
import styles from './horizontalSlide.module.css'

type SlideLgMaskProps = {
	id: number
	deployedUrl: string
}
const HorizontalSlideMask = (props: SlideLgMaskProps) => {
	const { id, deployedUrl } = props
	const dispatch = useAppDispatch()
	const cardId = useAppSelector((state) => state.projectCardHover.cardId)

	const handleCardHoverStart = () => {
		if (!cardId)
			dispatch(projectCardMouseEnter({ cardId: id, link: deployedUrl }))
	}
	const handleCardHoverEnd = () => dispatch(projectCardMouseLeave())
	const handleClick = () => window.open(deployedUrl)
	const initial = { opacity: 0, y: 0, width: '20vw' }
	const animateOnhover = { width: '100vw' }
	const transition = { duration: 0.4, ease: 'easeOut' }

	return (
		<motion.div
			onClick={handleClick}
			initial={initial}
			whileHover={animateOnhover}
			transition={transition}
			// onHoverStart={handleCardHoverStart}
			onHoverEnd={handleCardHoverEnd}
			onMouseMove={handleCardHoverStart}
			className={styles.container}
		/>
	)
}

export default HorizontalSlideMask
