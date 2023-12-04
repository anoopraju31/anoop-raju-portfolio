import ProjectCardBody from './ProjectCardBody'

const ProjectCard = ({ img }: { img: string }) => {
	return (
		<div className='w-full h-full'>
			<ProjectCardBody img={img} />
		</div>
	)
}

export default ProjectCard
