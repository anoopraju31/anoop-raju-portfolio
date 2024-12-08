import { FC } from 'react'
import styles from './styles.module.css'
import ExperienceAccordion from './components/ExperienceAccordion/ExperienceAccordion'

const Experience: FC = () => {
	return (
		<section className={styles.section} aria-label='experience'>
			<div className={styles.container}>
				<div className={styles['heading-container']}>
					<h2 className={styles.heading}> My Experience </h2>
				</div>

				<div className={styles['outter-container']}>
					<ExperienceAccordion />
					<ExperienceAccordion />
					<ExperienceAccordion />
				</div>
			</div>
		</section>
	)
}

export default Experience
