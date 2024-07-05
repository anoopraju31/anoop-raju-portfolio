import { type FC } from 'react'
import { type Metadata } from 'next'
import { Particles } from '@/components/Particles'
import RegularPage from './sections/RegularPage'

export const metadata: Metadata = {
	title: 'Projects',
}

const ProjectsPage: FC = () => {
	return (
		<main className='relative bg-black text-white'>
			<Particles className='fixed inset-0 -z-10' />
			<RegularPage />
		</main>
	)
}

export default ProjectsPage
