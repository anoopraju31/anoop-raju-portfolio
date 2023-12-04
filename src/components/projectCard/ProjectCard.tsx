import ProjectCardBody from './ProjectCardBody'
import ProjectCardMask from './ProjectCardMask'

const ProjectCard = ({ img }: { img: string }) => {
	return (
		<div className='w-full h-full relative'>
			<ProjectCardMask />
			<ProjectCardBody img={img} />
		</div>
	)
}

export default ProjectCard
