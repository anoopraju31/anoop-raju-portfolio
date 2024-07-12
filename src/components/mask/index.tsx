'use client'

import useMousePosition from '@/app/hooks/useMousePostion'
import useAppSelector from '@/app/hooks/useAppSelector'
import { ImArrowUpRight2 } from 'react-icons/im'
import { motion } from 'framer-motion'
import { redirect } from 'next/navigation'
import {
	maskAnimation,
	maskInitialAnimation,
	maskTransition,
} from '@/utills/animations'

import styles from './styles.module.css'

const Mask = ({ children }: { children: React.ReactNode }) => {
	const { x, y, containerRef } = useMousePosition()
	const isHovered = useAppSelector((state) => state.textHover.isHovered)
	const { cardId: currentCardId, link } = useAppSelector(
		(state) => state.projectCardHover,
	)
	const size = isHovered ? 300 : currentCardId ? 64 : 20

	return (
		<motion.div
			ref={containerRef}
			initial={maskInitialAnimation}
			animate={maskAnimation(
				// currentCardId ? -400 :
				x,
				// currentCardId ? -400 :
				y,
				size,
			)}
			transition={maskTransition}
			className={`${styles.mask} ${styles.m}`}>
			{currentCardId ? (
				<motion.div
					onClick={() => redirect(link ?? '/')}
					className={`w-16 h-16 bg-light-green text-dark-blue text-6xl rounded-full flex justify-center items-center absolute`}
					initial={{
						x: -400,
						y: -400,
					}}
					animate={{
						x: x - 32,
						y: y - 32,
					}}
					transition={{ type: 'tween', ease: 'backOut', duration: 0.001 }}>
					<ImArrowUpRight2 size={28} className='flex-shrink-0' />
				</motion.div>
			) : null}
			{children}
		</motion.div>
	)
}

export default Mask
