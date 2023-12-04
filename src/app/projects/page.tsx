import ProjectCard from '@/components/ProjectCard'

const ProjectsPage = () => {
	return (
		<main className='pt-[140px] sm:pt-[160px] md:pt-[60px] pb-10 sm:pb-[60px] lg:py-[100px] px-[10px] relative bg-black text-white'>
			<section className='w-full max-w-[1300px] mx-auto px-[10px]'>
				<div className='mt-[60px] flex justify-center items-center '>
					<h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold capitalize'>
						All Portfolio
					</h1>
				</div>

				<div className='my-[50px] grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-11'>
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
				</div>
			</section>
		</main>
	)
}

export default ProjectsPage
