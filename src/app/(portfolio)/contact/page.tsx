import { type FC } from 'react'
import { type Metadata } from 'next'
import { Gantari } from 'next/font/google'

import { Particles } from '@/components/Particles'
import RegularPage from './RegularPage'
import SmoothScrollLenis from '@/components/SmoothScrollLenis'

const gantari = Gantari({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Contact | Anoop Raju',
	description: 'Get in touch with Anoop Raju for full-stack web development, bespoke interactive visual engineering, and software collaborations.'
}

const ContactPage: FC = () => {
	return (
		<SmoothScrollLenis>
			<main className={`bg-dark-blue text-white relative min-h-screen overflow-x-hidden ${gantari.className}`}>
				{/* High-tech interactive Particle Background Canvas */}
				<Particles className='fixed inset-0 h-screen z-0 pointer-events-auto' />

				{/* Soft ambient atmospheric glows */}
				<div className='pointer-events-none fixed top-1/4 -left-48 w-96 h-96 bg-light-green/[0.03] rounded-full blur-[140px] z-0' />
				<div className='pointer-events-none fixed bottom-10 -right-48 w-96 h-96 bg-light-green/[0.04] rounded-full blur-[140px] z-0' />

				{/* Main Content */}
				<RegularPage />
			</main>

		</SmoothScrollLenis>
	)
}

export default ContactPage
