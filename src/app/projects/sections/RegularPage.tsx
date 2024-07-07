// import { devProjectCard } from './projectDetails'

import ProjectCard from '../_components/projectCard'

const RegularPage = () => {
	return (
		<div className='pt-[140px] sm:pt-[160px] md:pt-[60px] pb-10 sm:pb-[60px] lg:py-[100px] px-[10px]'>
			<section className='w-full max-w-[1400px] mx-auto px-[10px]'>
				<div className='mt-[60px] flex justify-center items-center'>
					<h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold capitalize'>
						All Portfolio
					</h1>
				</div>

				<div className='my-16 grid grid-cols-1 gap-16 gap-y-10 md:grid-cols-12'>
					{/* Project #1 */}
					<div className=' col-span-1 md:col-span-12'>
						<ProjectCard
							link='https://musical-stroopwafel-1c2327.netlify.app/landing.html'
							img='/eat-curious.png'
							alt='IBGroup vietnam website mockup'
							name='ibgroup vietnam website'
							year='2023'
							tools='HTML • TailwindCSS • JavaScript • Figma'
						/>
					</div>
					{/* Project #2 */}
					<div className='col-span-1 pt-0 md:col-span-7 md:pt-16'>
						<ProjectCard
							link='https://mementostudio.netlify.app/'
							img='/summerize.png'
							alt='memento landing page mockup'
							name='memento studio landing page'
							year='2023'
							tools='HTML • TailwindCSS • JavaScript'
						/>
					</div>
					<div className='col-span-1 pt-0 md:col-span-5 md:pt-80'>
						<ProjectCard
							link='https://realbusinessaccountants.netlify.app'
							img='/netflix-gpt.png'
							alt='real business accountant project mockup'
							name='real business accountants'
							year='2023'
							tools='HTML • CSS • JavaScript • Figma'
						/>
					</div>
					<div className='col-span-1 h-fit pt-0 md:col-span-8 md:pt-20'>
						<ProjectCard
							link='https://godaddyuiclone.netlify.app'
							img='/nike.png'
							alt='godaddy clone page mockup'
							name='GODADDY LANDING PAGE CLONE'
							year='2023'
							tools='HTML • TailwindCSS • JavaScript'
						/>
					</div>
					<div className='col-span-1 h-fit md:col-span-4'>
						<ProjectCard
							link='https://sunnysidechallenge.netlify.app'
							img='/dropbox.png'
							alt='sunnyside project mockup'
							name='SUNNYSIDE LANDING PAGE'
							year='2022'
							tools='HTML • TailwindCSS • JavaScript'
						/>
					</div>
				</div>
			</section>
		</div>
	)
}

export default RegularPage
