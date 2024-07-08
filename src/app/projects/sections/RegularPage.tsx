// import { devProjectCard } from './projectDetails'

import ProjectCard from '../_components/projectCard'

const RegularPage = () => {
	return (
		<div className='pt-[140px] sm:pt-[160px] md:pt-[60px] pb-10 sm:pb-[60px] lg:py-[100px] px-[10px]'>
			<section className='w-full max-w-[1400px] mx-auto px-[10px]'>
				<div className='mt-[60px] flex justify-center items-center'>
					<h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold capitalize'>
						All Projects
					</h1>
				</div>

				<div className='my-16 grid grid-cols-1 gap-16 gap-y-10 md:grid-cols-12'>
					{/* Project #1 */}
					<div className=' col-span-1 md:col-span-12'>
						<ProjectCard
							link='https://eat-curious-wysm.vercel.app/'
							img='/eat-curious.png'
							alt='eat-curious'
							name='Eat Curious'
							year='2023'
							tools='NextJS • ReactJS • TailwindCSS • Typescript'
						/>
					</div>
					{/* Project #2 */}
					<div className='col-span-1 pt-0 md:col-span-7 md:pt-16'>
						<ProjectCard
							link='https://react-ai-article-summarizer.netlify.app/'
							img='/summerize.png'
							alt='Summarizer'
							name='Summarizer'
							year='2023'
							tools='ReactJS • TailwindCSS • JavaScript • OpenAI API'
						/>
					</div>
					<div className='col-span-1 pt-0 md:col-span-5 md:pt-80'>
						<ProjectCard
							link='https://github.com/anoopraju31/netflix-gpt'
							img='/netflix-gpt.png'
							alt='NetFlix GPT'
							name='NetFlix GPT'
							year='2023'
							tools='ReactJS • TailwindCSS • JavaScript • OpenAI API'
						/>
					</div>
					<div className='col-span-1 h-fit pt-0 md:col-span-8 md:pt-20'>
						<ProjectCard
							link='https://github.com/anoopraju31/nike-landing-page'
							img='/nike.png'
							alt='nike page mockup'
							name='Nike LANDING PAGE CLONE'
							year='2023'
							tools='ReactJS • TailwindCSS • JavaScript'
						/>
					</div>
					<div className='col-span-1 h-fit md:col-span-4'>
						<ProjectCard
							link='https://nextjs-dropbox-clone.vercel.app/'
							img='/dropbox.png'
							alt='Dropbox mockup'
							name='Dropbox PAGE'
							year='2023'
							tools='NextJS • TailwindCSS • Typescript'
						/>
					</div>
				</div>
			</section>
		</div>
	)
}

export default RegularPage
