'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { slideToView } from '@/utills/animations'
import styles from './hero.module.css'

const Hero = () => {
	return (
		<section className={styles.body}>
			<div className={styles['hero-container']}>
				<div className={styles['hero-heading-container']}>
					<motion.h1
						variants={slideToView}
						initial='initial'
						whileInView='animate'
						viewport={{ once: true }}
						className={styles['hero-heading']}>
						Anoop
					</motion.h1>

					<motion.div
						variants={slideToView}
						initial='initial'
						whileInView='animate'
						viewport={{ once: true }}
						className='flex-shrink-0 overflow-hidden w-[var(--hero-image-width)] xl:w-[240px] h-[var(--hero-image-width)] xl:h-[240px]'>
						<Image
							src='/anoop-raju.jpg'
							className='w-full h-full rounded-full  object-cover'
							alt=''
							width={240}
							height={240}
						/>
					</motion.div>

					<motion.h1
						variants={slideToView}
						initial='initial'
						whileInView='animate'
						viewport={{ once: true }}
						className={styles['hero-heading']}>
						Raju
					</motion.h1>
				</div>

				<div className={styles['hero-subheading-container']}>
					<motion.h2
						variants={slideToView}
						initial='initial'
						whileInView='animate'
						viewport={{ once: true }}
						transition={{ delay: 0.5 }}
						className={styles['hero-subheading']}>
						Web Developer
					</motion.h2>
					<motion.h2
						variants={slideToView}
						initial='initial'
						whileInView='animate'
						viewport={{ once: true }}
						transition={{ delay: 0.5 }}
						className={styles['hero-subheading']}>
						Living in Kerala
					</motion.h2>
				</div>
			</div>
		</section>
	)
}

export default Hero
