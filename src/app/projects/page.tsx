import ProjectCard from '@/components/projectCard/ProjectCard'
import RegularPage from './sections/RegularPage'
import MaskPage from './sections/MaskPage'

const ProjectsPage = () => {
	return (
		<main className='relative bg-black text-white'>
			<MaskPage />
			<RegularPage />
		</main>
	)
}

export default ProjectsPage
