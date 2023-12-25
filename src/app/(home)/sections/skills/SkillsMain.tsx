import { skills } from '@/utills/constants'
import { PT_Sans } from 'next/font/google'
import SkillItem from './components/skillItem/SkillItem'
import styles from './styles.module.css'

const ptSans = PT_Sans({ weight: '400', subsets: ['latin'] })

const SkillsMain = () => {
	return (
		<section className={styles.section} aria-label='skills'>
			<div className={styles.container}>
				<div className={styles['heading-container']}>
					<h2 className={styles.heading}>Skills</h2>
				</div>

				<div className={styles['text-container']}>
					<div
						className={`${styles['left-text-outter-container']} ${ptSans.className}`}>
						<div className={styles['left-text-inner-container']}>
							<h3 className={styles['left-text-container-header']}>
								my digital tool box.
							</h3>
							<p className={styles['left-text-container-body']}>
								These are my go to tech stack to make any projects happen. I am
								always eager of learning more about my current stack, and new
								technologies that could expand my horizons.
							</p>
						</div>
					</div>

					<div className={styles['skills-container']}>
						{skills.map((skill, index) => (
							<SkillItem key={index} skill={skill} />
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default SkillsMain
