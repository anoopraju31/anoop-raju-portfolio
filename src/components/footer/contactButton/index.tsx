'use client'

import Link from 'next/link'
import MagneticContainer from '@/components/MagneticContainer'
import styles from './styles.module.css'

const ContactButton = () => {
	return (
		<MagneticContainer>
			<Link href='/contact' className={styles['contact-button']}>
				contact me
			</Link>
		</MagneticContainer>
	)
}

export default ContactButton
