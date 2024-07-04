import { Gantari } from 'next/font/google'
import Link from 'next/link'
import FooterScrollText from './footerScrollText'
import FooterLink from './footerLink'
import styles from './styles.module.css'

const gantari = Gantari({ weight: '400', subsets: ['latin'] })

const Footer = () => {
	return (
		<footer id='footer' aria-label='footer' className={styles.footer}>
			<FooterScrollText />

			<div className={styles.divider} />

			<div className={styles['outter-container']}>
				<div className={styles['inner-container']}>
					<div className={styles['contact-me-wrapper']}>
						<Link href='/contact' className={styles['contact-button']}>
							contact me
						</Link>
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
