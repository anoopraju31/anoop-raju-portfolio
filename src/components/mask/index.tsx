'use client'

import useMousePosition from '@/app/hooks/useMousePostion'
import { motion } from 'framer-motion'
import {
	maskAnimation,
	maskInitialAnimation,
	maskTransition,
} from '@/utills/animations'
import styles from './styles.module.css'

const Mask = ({ children }: { children: React.ReactNode }) => {
	const { x, y, containerRef } = useMousePosition()
	const size = 300
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
