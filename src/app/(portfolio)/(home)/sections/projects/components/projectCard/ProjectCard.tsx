'use client'

import type { FC } from 'react'
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'

type ProjectCardProps = {
	img: string
	id: number
	name: string
	year: string
	deployedUrl?: string
	tools?: string[]
}

const defaultTools: Record<number, string[]> = {
	1: ['Next.js', 'Firebase', 'TailwindCSS'],
	2: ['Next.js', 'TypeScript', 'Framer Motion'],
	3: ['React', 'OpenAI GPT', 'TailwindCSS'],
	4: ['React', 'OpenAI GPT', 'TMDB API'],
	5: ['React', 'TailwindCSS', 'JavaScript']
}

const ProjectCard: FC<ProjectCardProps> = (props) => {
	const { img, id, name, year, deployedUrl, tools } = props
	const currentCardId = useAppSelector((state) => state.projectCardHover.cardId)
	const isHovered = currentCardId === id
	const indexStr = String(id).padStart(2, '0')
	const projectTools = tools && tools.length > 0 ? tools : defaultTools[id] || ['React', 'Next.js', 'TypeScript']
	const displayTools = projectTools.slice(0, 3)

	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1, delay: 0.2, ease: 'easeInOut' }}
			viewport={{ once: true }}
			className={`w-full h-full relative rounded-3xl overflow-hidden border transition-all duration-500 flex flex-col justify-between ${
				isHovered
					? 'border-light-green/45 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(76,252,15,0.15)] bg-dark-blue'
					: 'border-white/15 shadow-2xl bg-dark-blue/90'
			}`}
		>
			{/* Image Background & Zoom */}
			<div className='absolute inset-0 w-full h-full overflow-hidden'>
				<motion.div
					animate={{
						scale: isHovered ? 1.06 : 1
					}}
					transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
					className='w-full h-full'
				>
					<Image
						src={img}
						alt={name || img}
						width={1200}
						height={800}
						priority
						className='w-full h-full object-cover'
					/>
				</motion.div>

				{/* Multi-tier Gradient Vignette Overlays */}
				<div className='absolute inset-0 bg-gradient-to-b from-dark-blue/80 via-transparent to-transparent h-32 pointer-events-none' />
				<div
					className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
						isHovered
							? 'bg-gradient-to-t from-dark-blue via-dark-blue/60 to-dark-blue/20 opacity-95'
							: 'bg-gradient-to-t from-dark-blue/95 via-dark-blue/60 to-black/30 opacity-90'
					}`}
				/>
			</div>

			{/* Card Header Bar (Always Visible) */}
			<div className='relative z-20 flex flex-wrap gap-2 items-center justify-between p-5 lg:p-6'>
				<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-wider border border-white/15 bg-dark-blue/70 backdrop-blur-md text-white/90'>
					<span className='w-1.5 h-1.5 rounded-full bg-light-green animate-pulse' />
					<span>[{indexStr} {isHovered ? '// FEATURED' : ''}]</span>
				</div>

				{year && (
					<span className='font-mono text-xs tracking-wider border border-white/10 bg-dark-blue/70 backdrop-blur-md text-white/70 px-2.5 py-1 rounded-full'>
						{year}
					</span>
				)}
			</div>

			{/* Card Bottom Area */}
			<div className='relative z-20 p-5 lg:p-6 overflow-hidden'>
				<AnimatePresence mode='wait'>
					{isHovered ? (
						<motion.div
							key='expanded'
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.35, ease: 'easeOut' }}
							className='flex flex-col gap-3'
						>
							{/* Tech Stack Pills (Max 3) */}
							<div className='flex items-center gap-2 flex-wrap'>
								{displayTools.map((tool, idx) => (
									<span
										key={idx}
										className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] tracking-wider border border-light-green/30 bg-light-green/10 text-light-green backdrop-blur-md shadow-sm'
									>
										<span className='w-1 h-1 rounded-full bg-light-green' />
										<span>{tool}</span>
									</span>
								))}
							</div>

							<h3 className='text-3xl lg:text-5xl font-extrabold capitalize text-white tracking-tight drop-shadow-lg leading-tight'>
								{name}
							</h3>

							<div className='flex items-center gap-3 pt-2'>
								<div className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider border border-light-green/40 bg-light-green/10 text-light-green backdrop-blur-md shadow-lg shadow-black/40'>
									<span>Explore Project</span>
									<FiArrowUpRight size={15} />
								</div>
								<span className='font-mono text-xs text-white/50'>[Click to launch]</span>
							</div>
						</motion.div>
					) : (
						<motion.div
							key='collapsed'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.25 }}
							className='flex flex-col gap-1'
						>
							<span className='font-mono text-[11px] text-light-green/80 uppercase tracking-wider truncate'>
								{displayTools[0]}
							</span>
							<h4 className='text-white font-bold line-clamp-1 text-lg lg:text-xl truncate tracking-tight'>
								{name}
							</h4>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	)
}

export default ProjectCard
