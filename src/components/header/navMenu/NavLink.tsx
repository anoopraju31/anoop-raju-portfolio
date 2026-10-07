'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch'
import { closeMenu } from '@/app/(portfolio)/features/navbarSlice'

type NavLinkProps = {
	title: string
	link: string
	index: number
	isActive: boolean
	isHovered: boolean
	isAnyHovered: boolean
	onHoverStart: () => void
	onHoverEnd: () => void
	isBackgroundDark: boolean
}

export const navItemVariants: Variants = {
	initial: {
		y: 80,
		opacity: 0,
		rotateX: 25,
		transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
	},
	enter: (i: number) => ({
		y: 0,
		opacity: 1,
		rotateX: 0,
		transition: {
			duration: 0.7,
			delay: 0.15 + i * 0.08,
			ease: [0.76, 0, 0.24, 1]
		}
	}),
	exit: (i: number) => ({
		y: 60,
		opacity: 0,
		transition: {
			duration: 0.35,
			delay: i * 0.04,
			ease: [0.76, 0, 0.24, 1]
		}
	})
}

const NavLink = ({
	title,
	link,
	index,
	isActive,
	isHovered,
	isAnyHovered,
	onHoverStart,
	onHoverEnd,
	isBackgroundDark
}: NavLinkProps) => {
	const dispatch = useAppDispatch()
	const handleClick = () => dispatch(closeMenu())
	const formattedIndex = (index + 1).toString().padStart(2, '0')

	return (
		<motion.div
			custom={index}
			variants={navItemVariants}
			className='overflow-hidden py-1 md:py-2'
		>
			<Link
				href={link}
				onClick={handleClick}
				onMouseEnter={onHoverStart}
				onMouseLeave={onHoverEnd}
				onFocus={onHoverStart}
				onBlur={onHoverEnd}
				className={`group relative flex items-center gap-4 sm:gap-6 md:gap-8 transition-opacity duration-300 outline-none select-none ${
					isAnyHovered && !isHovered ? 'opacity-30' : 'opacity-100'
				}`}
			>
				{/* Numeric Index */}
				<span
					className={`font-mono text-xs sm:text-sm tracking-widest transition-colors duration-300 ${
						isHovered || isActive
							? isBackgroundDark
								? 'text-light-green'
								: 'text-dark-blue font-bold'
							: isBackgroundDark
							? 'text-white/40'
							: 'text-dark-blue/50'
					}`}
				>
					{formattedIndex}
				</span>

				{/* Title and Kinetic Arrow */}
				<div className='flex items-center gap-3 sm:gap-5 overflow-visible'>
					<span
						className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight transition-all duration-300 ease-out transform ${
							isHovered
								? 'translate-x-3 sm:translate-x-6'
								: 'translate-x-0'
						} ${
							isActive
								? isBackgroundDark
									? 'text-light-green drop-shadow-[0_0_24px_rgba(76,252,15,0.35)]'
									: 'text-dark-blue underline decoration-4 underline-offset-8'
								: isBackgroundDark
								? 'text-white group-hover:text-light-green'
								: 'text-dark-blue group-hover:opacity-80'
						}`}
					>
						{title}
					</span>

					{/* Kinetic Indicator: Arrow or Active Dot */}
					<div
						className={`flex items-center justify-center transition-all duration-300 ease-out ${
							isHovered
								? 'opacity-100 translate-x-3 sm:translate-x-6 scale-100'
								: isActive
								? 'opacity-100 translate-x-0 scale-100'
								: 'opacity-0 -translate-x-4 scale-75 pointer-events-none'
						}`}
					>
						{isHovered ? (
							<FiArrowUpRight
								className={`text-3xl sm:text-5xl md:text-6xl transition-transform duration-300 group-hover:rotate-45 ${
									isBackgroundDark ? 'text-light-green' : 'text-dark-blue'
								}`}
							/>
						) : isActive ? (
							<span className='flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider backdrop-blur-md border border-light-green/30'>
								<span
									className={`w-2 h-2 rounded-full animate-ping ${
										isBackgroundDark ? 'bg-light-green' : 'bg-dark-blue'
									}`}
								/>
								<span
									className={
										isBackgroundDark ? 'text-light-green' : 'text-dark-blue'
									}
								>
									Active
								</span>
							</span>
						) : null}
					</div>
				</div>
			</Link>
		</motion.div>
	)
}

export default NavLink
