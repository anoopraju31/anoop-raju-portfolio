'use client'

import { Gantari } from 'next/font/google'
import { useMouse } from '@uidotdev/usehooks'
import Link from 'next/link'
import FooterScrollText from './footerScrollText'
import FooterLink from './footerLink'
import styles from './styles.module.css'
import { type FC, type Ref, useState } from 'react'
import { motion } from 'framer-motion'

const gantari = Gantari({ weight: '400', subsets: ['latin'] })

const Footer: FC = () => {
	const [mouse, ref] = useMouse()
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const { elementX, elementY } = mouse

	const handleMouseEnter = () => setIsVisible(true)
	const handleMouseLeave = () => setIsVisible(false)

	return (
		<footer
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={ref as Ref<HTMLElement> | undefined}
			id='footer'
			aria-label='footer'
			className={styles.footer}
		>
			<motion.div
				className={`${isVisible ? 'visible' : 'invisible'} w-32 h-32 bg-transparent border border-dark-blue rounded-full flex justify-center items-center absolute transition-opacity`}
				animate={{
					height: 32,
					width: 32,
					fontSize: '18px',
					x: elementX - 16,
					y: elementY - 16
				}}
				transition={{ type: 'tween', ease: 'backOut', duration: 0.05 }}
			></motion.div>

			<motion.div
				className={`${isVisible ? 'visible' : 'invisible'} w-1.5 h-1.5 bg-dark-blue rounded-full z-10 transition-opacity`}
				animate={{
					height: 6,
					width: 6,
					fontSize: '18px',
					x: elementX - 3,
					y: elementY - 3
				}}
				transition={{ type: 'tween', ease: 'backOut', duration: 0.01 }}
			/>

			<FooterScrollText />

			<div className={styles.divider} />

			<div className={styles['outter-container']}>
				<div className={styles['inner-container']}>
					<div className={styles['contact-me-wrapper']}>
						<Link href='/contact' className={styles['contact-button']}>
							contact me
						</Link>
					</div>

					<ul className={`${styles['footer-links-container']} ${gantari.className}`}>
						<FooterLink title='Linked In' link='https://www.linkedin.com/in/anoop-raju' />
						<FooterLink title='GitHub' link='https://github.com/anoopraju31' />
						<FooterLink title='Instagram' link='https://www.instagram.com/_a.n.o.o.p_r.a.j.u_/' />
						<FooterLink title='Email' link='mailto:anoop2019@iiitkottaya.ac.in' />
					</ul>
				</div>
			</div>

			{/* copy right */}
			<div className={styles['copyright-container']}>
				<p className={styles['copyright-text']}>
					Build using <span className={styles['highlighted-text']}>Nextjs</span>. developed by{' '}
					<span className={styles['highlighted-text']}>anoop raju</span>
				</p>
			</div>
		</footer>
	)
}

export default Footer
