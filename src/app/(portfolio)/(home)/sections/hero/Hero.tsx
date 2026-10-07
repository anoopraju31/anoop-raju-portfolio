'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import { slideToView } from '@/utills/animations'
import styles from './hero.module.css'

const Hero = () => {
	return (
		<section className={styles.body}>
			<div className={styles['hero-container']}>
				{/* Status Eyebrow Badge */}
				<motion.div
					variants={slideToView}
					initial='initial'
					whileInView='animate'
					viewport={{ once: true }}
					className='flex justify-center mb-1'
				>
					<div className='inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-light-green/30 bg-light-green/[0.06] backdrop-blur-md text-light-green text-xs sm:text-sm font-mono tracking-wider uppercase shadow-sm'>
						<span className='w-2 h-2 rounded-full bg-light-green animate-pulse' />
						<span>Available for Worldwide Opportunities</span>
					</div>
				</motion.div>

				<h1 className={styles['hero-heading-container']}>
					<motion.span
						variants={slideToView}
						initial='initial'
						whileInView='animate'
						viewport={{ once: true }}
						className={styles['hero-heading']}
					>
						Anoop
					</motion.span>

					<motion.div
						variants={slideToView}
						initial='initial'
						whileInView='animate'
						viewport={{ once: true }}
						className='flex-shrink-0 overflow-hidden w-[var(--hero-image-width)] xl:w-[240px] h-[var(--hero-image-width)] xl:h-[240px] rounded-full border-2 border-white/20 p-1 bg-white/5 shadow-2xl relative group'
					>
						<Image
							src='/anoop-raju.jpg'
							className='w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105'
							alt='Anoop Raju'
							width={240}
							height={240}
							priority
						/>
					</motion.div>

					<motion.span
						variants={slideToView}
						initial='initial'
						whileInView='animate'
						viewport={{ once: true }}
						className={styles['hero-heading']}
					>
						Raju
					</motion.span>
				</h1>

				<div className={styles['hero-subheading-container']}>
					<motion.p
						variants={slideToView}
						initial='initial'
						whileInView='animate'
						viewport={{ once: true }}
						transition={{ delay: 0.5 }}
						className={styles['hero-subheading']}
					>
						Full Stack Developer
					</motion.p>
					<motion.p
						variants={slideToView}
						initial='initial'
						whileInView='animate'
						viewport={{ once: true }}
						transition={{ delay: 0.5 }}
						className={styles['hero-subheading']}
					>
						Living in Kerala, India
					</motion.p>
				</div>

				{/* Scroll Down Cue */}
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1, duration: 0.8 }}
					className='flex justify-center mt-6 sm:mt-8'
				>
					<a
						href='#projects'
						className='inline-flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-widest text-white/50 hover:text-light-green transition-colors'
					>
						<span>Explore Projects</span>
						<FiArrowDown className='animate-bounce text-light-green' />
					</a>
				</motion.div>
			</div>
		</section>
	)
}

export default Hero
