import { type FC } from 'react'
import { services, skills } from '@/utills/constants'
import SkillsContainer from './components/skillsContainer/SkillsContainer'
import styles from './styles.module.css'

const SkillsMain: FC = () => {
	return (
		<section className={styles.section} aria-label='skills & services'>
			<div className={styles.container}>
				{/* Section Header */}
				<header className={styles.headingContainer}>
					<div className={`${styles.eyebrowBadge} ${styles.eyebrowBadgeRegular}`}>
						<span className={`${styles.pulseDot} ${styles.pulseDotRegular}`} />
						<span>Capabilities &bull; Disciplines &amp; Stack</span>
					</div>

					<h2 className={`${styles.heading} ${styles.headingRegular}`}>
						Services{' '}
						<span className={styles.headingHighlightRegular}>&amp; Skills</span>
					</h2>

					<p className={`${styles.subtitle} ${styles.subtitleRegular}`}>
						A breakdown of specialized design and web engineering services, paired with
						my go-to technology stack for creating impactful digital experiences.
					</p>
				</header>

				<div className={styles.blocksWrapper}>
					<SkillsContainer
						index={1}
						title='my expertises.'
						description='I focus on all things design and web related. With each of my services, my goal is to deliver an impactful and elevating digital experience for everyone.'
						skills={services}
					/>

					<SkillsContainer
						index={2}
						title='my digital tool box.'
						description='These are my go to tech stack to make any projects happen. I am always eager of learning more about my current stack, and new technologies that could expand my horizons.'
						skills={skills}
					/>
				</div>
			</div>
		</section>
	)
}

export default SkillsMain
