// import { devProjectCard } from './projectDetails'

import ProjectCard from '../_components/projectCard'
import styles from './projects.module.css'

const RegularPage = () => {
	return (
		<main className={styles.regularPage}>
			<section className={styles.container}>
				<div className={styles.heading__container}>
					<h1>All Projects</h1>
				</div>

				<div className={styles.project__container}>
					{/* Project #1 */}
					<div className={styles.project1__container}>
						<ProjectCard
							id={1}
							link='https://eat-curious-wysm.vercel.app/'
							img='/eat-curious.png'
							alt='eat-curious'
							name='Eat Curious'
							year='2023'
							tools='NextJS • ReactJS • TailwindCSS • Typescript'
						/>
					</div>

					{/* Project #2 */}
					<div className={styles.project2__container}>
						<ProjectCard
							id={2}
							link='https://react-ai-article-summarizer.netlify.app/'
							img='/summerize.png'
							alt='Summarizer'
							name='Summarizer'
							year='2023'
							tools='ReactJS • TailwindCSS • JavaScript • OpenAI API'
						/>
					</div>

					{/* Project #3 */}
					<div className={styles.project3__container}>
						<ProjectCard
							id={3}
							link='https://github.com/anoopraju31/netflix-gpt'
							img='/netflix-gpt.png'
							alt='NetFlix GPT'
							name='NetFlix GPT'
							year='2023'
							tools='ReactJS • TailwindCSS • JavaScript • OpenAI API'
						/>
					</div>

					{/* Project #4 */}
					<div className={styles.project4__container}>
						<ProjectCard
							id={4}
							link='https://github.com/anoopraju31/nike-landing-page'
							img='/nike.png'
							alt='nike page mockup'
							name='Nike LANDING PAGE CLONE'
							year='2023'
							tools='ReactJS • TailwindCSS • JavaScript'
						/>
					</div>

					{/* Project #5 */}
					<div className={styles.project5__container}>
						<ProjectCard
							id={5}
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
		</main>
	)
}

export default RegularPage
