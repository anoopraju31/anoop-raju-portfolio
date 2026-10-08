'use client'

import useMousePosition from '@/app/(portfolio)/hooks/useMousePostion'
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector'
import { ImArrowUpRight2 } from 'react-icons/im'
import { motion, AnimatePresence } from 'framer-motion'
import { maskAnimation, maskInitialAnimation, maskTransition } from '@/utills/animations'

import styles from './styles.module.css'

const Mask = ({ children }: { children: React.ReactNode }) => {
	const { x, y, containerRef } = useMousePosition()
	const isHovered = useAppSelector((state) => state.textHover.isHovered)
	const { cardId: currentCardId, link } = useAppSelector((state) => state.projectCardHover)
	const size = isHovered ? 300 : 20

	return (
		<>
			<motion.div
				ref={containerRef}
				initial={maskInitialAnimation}
				animate={
					currentCardId
						? maskInitialAnimation
						: maskAnimation(x, y, size)
				}
				transition={maskTransition}
				className={`${styles.mask} ${styles.m}`}
			>
				{children}
			</motion.div>

			<AnimatePresence>
				{currentCardId ? (
					<motion.div
						key='project-cursor-arrow'
						className='w-16 h-16 bg-light-green text-dark-blue rounded-full flex justify-center items-center absolute z-50 pointer-events-none shadow-xl'
						style={{ left: 0, top: 0 }}
						initial={{
							x: x - 32,
							y: y - 32,
							scale: 0,
							opacity: 0
						}}
						animate={{
							x: x - 32,
							y: y - 32,
							scale: 1,
							opacity: 1
						}}
						exit={{
							scale: 0,
							opacity: 0
						}}
						transition={{
							scale: { duration: 0.18, ease: 'easeOut' },
							opacity: { duration: 0.15 },
							x: { duration: 0 },
							y: { duration: 0 }
						}}
					>
						<ImArrowUpRight2 size={26} className='flex-shrink-0' />
					</motion.div>
				) : null}
			</AnimatePresence>
		</>
	)
}

export default Mask
