import { Particles } from '@/components/Particles'
import RegularPage from './sections/RegularPage'

const ProjectsPage = () => {
	return (
		<main className='relative bg-black text-white'>
			<Particles className='fixed inset-0 -z-10' />
			<RegularPage />
		</main>
	)
}

export default ProjectsPage
