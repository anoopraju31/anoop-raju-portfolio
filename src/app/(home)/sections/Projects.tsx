import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'

const Projects = () => {
	return (
		<section className='pb-10 z-50'>
			<div className='relative py-5 px-[10px] flex flex-col lg:flex-row gap-4'>
				<div className='sticky top-32 w-full lg:w-[20vw] lg:hover:w-[50vw] lg:hover:flex-shrink-0 h-[50vh] lg:h-[90vh] transition-width duration-500'>
					<ProjectCard img='/dropbox.png' />
				</div>
				<div className='sticky top-32 w-full lg:w-[20vw] lg:hover:w-[50vw] lg:hover:flex-shrink-0 h-[50vh] lg:h-[90vh] transition-width duration-500'>
					<ProjectCard img='/eat-curious.png' />
				</div>
				<div className='sticky top-32 w-full lg:w-[20vw] lg:hover:w-[50vw] lg:hover:flex-shrink-0 h-[50vh] lg:h-[90vh] transition-width duration-500'>
					<ProjectCard img='/summerize.png' />
				</div>
				<div className='sticky top-32 w-full lg:w-[20vw] lg:hover:w-[50vw] lg:hover:flex-shrink-0 h-[50vh] lg:h-[90vh] transition-width duration-500'>
					<ProjectCard img='/netflix-gpt.png' />
				</div>
				<div className='sticky top-32 w-full lg:w-[20vw] lg:hover:w-[50vw] lg:hover:flex-shrink-0 h-[50vh] lg:h-[90vh] transition-width duration-500'>
					<ProjectCard img='/nike.png' />
				</div>
			</div>

			<div className='py-5 lg:py-10  flex justify-center items-center'>
				<Link
					href='/projects'
					className='px-5 py-[15px] text-lg lg:text-xl rounded-3xl uppercase border border-white'>
					View More Projects
				</Link>
			</div>
		</section>
	)
}

export default Projects
