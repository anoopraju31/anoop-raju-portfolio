import { type FC } from 'react'
import { type Metadata } from 'next'
import { Gantari } from 'next/font/google'
import { Particles } from '@/components/Particles'
import RegularPage from './sections/RegularPage'
import MaskPage from './sections/MaskPage'
import SmoothScrollLenis from '@/components/SmoothScrollLenis'

const gantari = Gantari({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Projects | Anoop Raju',
	description:
		'Explore curated software engineering projects, production web applications, and interactive digital experiments by Anoop Raju.'
}

const ProjectsPage: FC = () => {
	return (
		<SmoothScrollLenis>
			<main
				className={`relative bg-dark-blue text-white min-h-screen overflow-x-hidden ${gantari.className}`}
			>
				{/* High-tech interactive Particle Canvas Background */}
				<Particles className='fixed inset-0 h-screen z-0 pointer-events-auto' />

				{/* Soft ambient atmospheric glows */}
				<div className='pointer-events-none fixed top-1/4 -left-48 w-96 h-96 bg-light-green/[0.03] rounded-full blur-[140px] z-0' />
				<div className='pointer-events-none fixed bottom-1/3 -right-48 w-96 h-96 bg-light-green/[0.03] rounded-full blur-[140px] z-0' />

				{/* Interactive SVG Mask Layer */}
				<MaskPage />

				{/* Main Regular Page Layer */}
				<RegularPage />
			</main>
		</SmoothScrollLenis>
	)
}

export default ProjectsPage
