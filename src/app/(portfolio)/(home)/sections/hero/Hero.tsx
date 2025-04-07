'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { slideToView } from '@/utills/animations'
import styles from './hero.module.css'

const Hero = () => {
	return (
		<section className={styles.body}>
			<div className={styles['hero-container']}>
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
						className='flex-shrink-0 overflow-hidden w-[var(--hero-image-width)] xl:w-[240px] h-[var(--hero-image-width)] xl:h-[240px]'
					>
						<Image
							src='/anoop-raju.jpg'
							className='w-full h-full rounded-full  object-cover'
							alt=''
							width={240}
							height={240}
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
			</div>
		</section>
	)
}

export default Hero
