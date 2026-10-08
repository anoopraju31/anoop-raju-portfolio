'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

type Props = { children: ReactNode }

const slotDelays = [0.65, 0.73, 0.81, 0.89, 0.97]
// const slotNumbers = ['01', '02', '03', '04', '05']
const slotTags = ['DESIGN', 'ENGINEER', 'INTERACT', 'MOTION', 'CRAFT']

export default function PageTransitionLoader({ children }: Props) {
	const pathname = usePathname()
	const [progress, setProgress] = useState(0)
	const [isComplete, setIsComplete] = useState(false)

	// Format the current destination route for display
	const getPageLabel = () => {
		if (!pathname || pathname === '/') return 'INDEX'
		const segment = pathname.split('/').filter(Boolean)[0]
		return segment ? segment.toUpperCase() : 'PORTFOLIO'
	}

	useEffect(() => {
		const startTime = performance.now()
		const duration = 650 // ms duration for count-up

		const update = (now: number) => {
			const elapsed = now - startTime
			const p = Math.min(1, elapsed / duration)
			// Smooth ease-out quad curve
			const eased = Math.round((1 - Math.pow(1 - p, 2)) * 100)
			setProgress(eased)
			if (p < 1) {
				requestAnimationFrame(update)
			}
		}

		const raf = requestAnimationFrame(update)
		const timer = setTimeout(() => {
			setIsComplete(true)
		}, 1900)

		return () => {
			cancelAnimationFrame(raf)
			clearTimeout(timer)
		}
	}, [pathname])

	return (
		<div>
			{!isComplete && (
				<div className='fixed inset-0 w-full h-screen z-[100000] pointer-events-none select-none overflow-hidden'>
					{/* Centered Kinetic HUD Overlay */}
					<div className='absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none'>
						<motion.div
							initial={{ opacity: 1, y: 0 }}
							animate={{ opacity: 0, y: -40 }}
							transition={{ delay: 0.65, duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
							className='flex flex-col items-center text-center px-4'
						>
							{/* Top Route Status Pill */}
							<div className='flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-dark-blue/10 backdrop-blur-md text-dark-blue font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-3 border border-dark-blue/15 shadow-sm'>
								<span className='w-2 h-2 rounded-full bg-dark-blue animate-ping' />
								<span>ANOOP RAJU &bull; {getPageLabel()}</span>
							</div>

							{/* Large Digital Percentage Counter */}
							<div className='flex items-baseline font-mono'>
								<span className='text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-dark-blue leading-none'>
									{String(progress).padStart(2, '0')}
								</span>
								<span className='text-2xl sm:text-3xl font-bold text-dark-blue/60 ml-1'>
									%
								</span>
							</div>

							{/* Kinetic Progress Bar Track */}
							<div className='w-44 sm:w-64 h-[3px] bg-dark-blue/20 rounded-full overflow-hidden mt-3 relative'>
								<div
									className='h-full bg-dark-blue rounded-full transition-all duration-75 ease-out'
									style={{ width: `${progress}%` }}
								/>
							</div>

							{/* Micro Status Indicators */}
							<div className='mt-4 flex items-center gap-3 font-mono text-[10px] sm:text-xs tracking-widest text-dark-blue/70 uppercase'>
								<span>INITIALIZING</span>
								<span>&bull;</span>
								<span>EXPERIENCE READY</span>
							</div>
						</motion.div>
					</div>

					{/* 5 Vertical Staggered Curtain Slots */}
					<div className='w-full h-full flex'>
						{slotDelays.map((delay, index) => (
							<motion.div
								key={index}
								initial={{ y: '0%' }}
								animate={{ y: '-100%' }}
								transition={{
									duration: 0.85,
									delay,
									ease: [0.76, 0, 0.24, 1]
								}}
								// shadow-[0_25px_50px_rgba(0,0,0,0.25)] border-r border-dark-blue/10 last:border-r-0 
								className='w-1/5 h-full bg-light-green relative flex flex-col justify-between p-4 sm:p-6'
							>
								{/* Top Slot Index */}
								<span className='font-mono text-[11px] sm:text-xs text-dark-blue/35 font-bold'>
									{/* [{slotNumbers[index]}] */}
								</span>

								{/* Bottom Architectural Tag */}
								<span className='font-mono text-[9px] sm:text-[11px] text-dark-blue/35 tracking-wider font-semibold truncate'>
									{slotTags[index] || 'SYSTEM'}
								</span>
							</motion.div>
						))}
					</div>
				</div>
			)}

			{children}
		</div>
	)
}
