import { type FC } from 'react'
import { type Metadata } from 'next'
import { Particles } from '@/components/Particles'
import RegularPage from './sections/RegularPage'
import MaskPage from './sections/MaskPage'

export const metadata: Metadata = {
	title: 'Projects'
}

const ProjectsPage: FC = () => {
	return (
		<main className='relative bg-dark-blue text-white'>
			<Particles className='fixed inset-0 h-screen' />
			<MaskPage />
			<RegularPage />
		</main>
	)
}

export default ProjectsPage
