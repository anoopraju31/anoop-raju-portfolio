'use client'

import { Gantari } from 'next/font/google'
import FooterScrollText from './footerScrollText'
import FooterLink from './footerLink'
import ContactButton from './contactButton'
import styles from './styles.module.css'
import { Ref, useEffect, useState } from 'react'
import { useMouse } from '@uidotdev/usehooks'
import { motion } from 'framer-motion'

const gantari = Gantari({ weight: '400', subsets: ['latin'] })

const Footer = () => {
	const [hover, setHover] = useState(false)
	const [mouse, ref] = useMouse()
	const { elementX, elementY, x, y } = mouse

	const handleMouseEnter = () => setHover(true)
	const handleMouseLeave = () => setHover(false)
	const handleScroll = () => setHover(false)

	useEffect(() => {
		const container = ref.current
		if (!container) return

		container.addEventListener('mouseenter', handleMouseEnter)
		container.addEventListener('mouseleave ', handleMouseLeave)
		document.addEventListener('scroll', handleScroll)

		return () => {
			container.removeEventListener('mouseenter', handleMouseEnter)
			container.removeEventListener('mouseleave ', handleMouseLeave)
			document.removeEventListener('scroll', handleScroll)
		}
	}, [ref])

	return (
		<footer
			ref={ref as Ref<HTMLDivElement> | undefined}
			id='footer'
			aria-label='footer'
			className={styles.footer}>
			{hover && (
				<motion.div
					className={`w-5 h-5 bg-dark-blue rounded-full flex justify-center items-center absolute`}
					animate={{
						x: elementX - 10,
						y: elementY - 10,
					}}
					transition={{ type: 'tween', ease: 'backOut', duration: 0.001 }}
				/>
			)}

			<FooterScrollText />
			<div className={styles.divider} />

			<div className={styles['outter-container']}>
				<div className={styles['inner-container']}>
					<div className={styles['contact-me-wrapper']}>
						<ContactButton />
					</div>

					<ul
						className={`${styles['footer-links-container']} ${gantari.className}`}>
						<FooterLink
							title='Linked In'
							link='https://www.linkedin.com/in/anoop-raju'
						/>
						<FooterLink title='GitHub' link='https://github.com/anoopraju31' />
						<FooterLink
							title='Instagram'
							link='https://www.instagram.com/_a.n.o.o.p_r.a.j.u_/'
						/>
						<FooterLink
							title='Email'
							link='mailto:anoop2019@iiitkottaya.ac.in'
						/>
					</ul>
				</div>
			</div>

			{/* copy right */}
			<div className={styles['copyright-container']}>
				<p className={styles['copyright-text']}>
					Build using <span className={styles['highlighted-text']}>Nextjs</span>
					. developed by{' '}
					<span className={styles['highlighted-text']}>anoop raju</span>
				</p>
			</div>
		</footer>
	)
}

export default Footer
