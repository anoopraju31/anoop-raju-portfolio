'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = { children: ReactNode }

export default function PageTransitionLoader({ children }: Props) {
	return (
		<div>
			<motion.div
				initial={{ y: 0 }}
				whileInView={{ y: '-100%' }}
				transition={{ delay: 1.45, duration: 0 }}
				viewport={{ once: true }}
				className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen flex z-[100000]'>
				<motion.div
					initial={{ y: '0%' }}
					animate={{ y: '-100%' }}
					transition={{ duration: 1, delay: 0 }}
					className='w-1/5 h-full bg-light-green'
				/>
				<motion.div
					initial={{ y: '0%' }}
					animate={{ y: '-100%' }}
					transition={{ duration: 1, delay: 0.15 }}
					className='w-1/5 h-full bg-light-green'
				/>
				<motion.div
					initial={{ y: '0%' }}
					animate={{ y: '-100%' }}
					transition={{ duration: 1, delay: 0.25 }}
					className='w-1/5 h-full bg-light-green'
				/>
				<motion.div
					initial={{ y: '0%' }}
					animate={{ y: '-100%' }}
					transition={{ duration: 1, delay: 0.35 }}
					className='w-1/5 h-full bg-light-green'
				/>
				<motion.div
					initial={{ y: '0%' }}
					animate={{ y: '-100%' }}
					transition={{ duration: 1, delay: 0.45 }}
					className='w-1/5 h-full bg-light-green'
				/>
			</motion.div>

			{children}
		</div>
	)
}
