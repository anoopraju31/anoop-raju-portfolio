'use client'

import { Gantari } from 'next/font/google'
import { useLayoutEffect, useRef, useState, type FC } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

import FooterScrollText from './footerScrollText'
import FooterLink from './footerLink'

import styles from './styles.module.css'

const gantari = Gantari({ weight: '400', subsets: ['latin'] })

type MousePosition = {
	x: number
	y: number
}

const Footer: FC = () => {
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: -400,
		y: -400
	})
	const containerRef = useRef<HTMLElement | null>(null)
		
	useLayoutEffect(() => {
		const handleMousePosition = (e: MouseEvent) => {
			if (!containerRef.current) return
			const rect = containerRef.current.getBoundingClientRect()
			setMousePosition({
				x: e.clientX - rect.left,
				y: e.clientY - rect.top
			})
		}

		const handleScroll = () => {
			setMousePosition({
				x: -400,
				y: -400
			})
		}

		document.addEventListener('mousemove', handleMousePosition)
		document.addEventListener('scroll', handleScroll)

		return () => {
			document.removeEventListener('mousemove', handleMousePosition)
			document.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const year = new Date().getFullYear()


	return (
		<footer
			ref={containerRef}
			id='footer'
			aria-label='footer'
			className={styles.footer}
		>
			<motion.div
				className={`w-8 h-8 bg-transparent border border-dark-blue rounded-full flex justify-center items-center absolute top-0 left-0 pointer-events-none transition-opacity`}
				animate={{
					x: mousePosition.x - 16,
					y: mousePosition.y - 16
				}}
				transition={{ type: 'tween', ease: 'backOut', duration: 0.05 }}
			/>

			<motion.div
				className={`w-1.5 h-1.5 bg-dark-blue rounded-full z-10 absolute top-0 left-0 pointer-events-none transition-opacity`}
				animate={{
					x: mousePosition.x - 3,
					y: mousePosition.y - 3
				}}
				transition={{ type: 'tween', ease: 'backOut', duration: 0.01 }}
			/>

			<FooterScrollText />

			<div className={styles.divider} />

			<div className={styles['outter-container']}>
				<div className={styles['inner-container']}>
					<div className={styles['contact-me-wrapper']}>
						<Link href='/contact' className={styles['contact-button']}>
							Contact Me
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
				<p className={styles['copyright-text']}>© {year} Anoop Raju. All rights reserved.</p>
			</div>
		</footer>
	)
}

export default Footer
