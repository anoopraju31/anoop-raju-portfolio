import { services, skills } from '@/utills/constants'
import SkillsContainer from './components/skillsContainer/SkillsContainer'
import styles from './styles.module.css'

const SkillsMain = () => {
	return (
		<section className={styles.section} aria-label='skills'>
			<div className={styles.container}>
				<div className={styles['heading-container']}>
					<h2 className={styles.heading}>Services </h2>
				</div>

				<SkillsContainer
					title='my expertises.'
					description='I focus on all things design and web related. With each of my
								services, my goal is to deliver an impactful and elevating
								digital experience for everyone.'
					skills={services}
				/>

				<div className='py-4'></div>

				<SkillsContainer
					title='my digital tool box.'
					description='These are my go to tech stack to make any projects happen. I am
								always eager of learning more about my current stack, and new
								technologies that could expand my horizons.'
					skills={skills}
				/>
			</div>
		</section>
	)
}

export default SkillsMain
