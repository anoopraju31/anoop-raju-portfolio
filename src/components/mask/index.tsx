'use client'

import useMousePosition from '@/app/hooks/useMousePostion'
import useAppSelector from '@/app/hooks/useAppSelector'
import { motion } from 'framer-motion'
import {
	maskAnimation,
	maskInitialAnimation,
	maskTransition,
} from '@/utills/animations'
import styles from './styles.module.css'

const Mask = ({ children }: { children: React.ReactNode }) => {
	const { x, y, containerRef } = useMousePosition()
	const isHovered = useAppSelector((state) => state.textHover.isHovered)
	const size = isHovered ? 300 : 20

	return (
		<motion.div
			ref={containerRef}
			initial={maskInitialAnimation}
			animate={maskAnimation(x, y, size)}
			transition={maskTransition}
			className={styles.mask}>
			{children}
		</motion.div>
	)
}

export default Mask
