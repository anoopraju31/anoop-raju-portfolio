'use client'

import type { FC } from 'react'
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

type ProjectCardProps = {
	img: string
	id: number
	name: string
	year: string
}

const ProjectCard: FC<ProjectCardProps> = (props) => {
	const { img, id, name, year } = props
	const currentCardId = useAppSelector((state) => state.projectCardHover.cardId)

	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1, delay: 1.6, ease: 'easeInOut' }}
			viewport={{ once: true }}
			className='w-full h-full relative overflow-hidden'
		>
			<div
				className={`w-full h-full absolute top-0 z-10 ${
					currentCardId === id ? 'bg-black/30' : 'bg-transparent'
				} transition-colors duration-1000`}
			></div>

			<div className='w-full h-full'>
				<Image
					src={img}
					alt={img}
					width={1000}
					height={1000}
					priority
					className='w-full h-full object-cover rounded-xl'
				/>
			</div>

			<AnimatePresence>
				{currentCardId === id && (
					<motion.div
						initial={{
							opacity: 0
						}}
						animate={{
							opacity: 1
						}}
						exit={{
							opacity: 0
						}}
						transition={{
							duration: 1,
							ease: 'backOut'
						}}
						className='absolute bottom-10 left-0 right-0 z-10 w-full flex justify-between items-center px-10 overflow-hidden'
					>
						<div>
							<h3 className='text-white text-5xl font-extrabold capitalize'>{name}</h3>
							<p className='text-white text-2xl font-medium'> {year} </p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default ProjectCard
