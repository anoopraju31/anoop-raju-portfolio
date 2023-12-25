import Link from 'next/link'
import { Gantari } from 'next/font/google'
import FooterScrollText from './footerScrollText'
import FooterLink from './footerLink'
import ContactButton from './contactButton'
import styles from './styles.module.css'

const gantari = Gantari({ weight: '400', subsets: ['latin'] })

const Footer = () => {
	return (
		<footer className={styles.footer}>
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
					Powered By <span className={styles['highlighted-text']}>Nextjs</span>.
					developed by{' '}
					<span className={styles['highlighted-text']}>anoop raju</span>
				</p>
			</div>
		</footer>
	)
}

export default Footer
