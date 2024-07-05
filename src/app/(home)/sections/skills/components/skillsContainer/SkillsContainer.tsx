import { type FC } from 'react'
import { PT_Sans } from 'next/font/google'
import SkillItem from '../skillItem/SkillItem'
import styles from './styles.module.css'

type Props = {
	title: string
	description: string
	skills: string[]
}

const ptSans = PT_Sans({ weight: '400', subsets: ['latin'] })

const SkillsContainer: FC<Props> = ({ title, description, skills }) => {
	return (
		<div className={styles['text-container']}>
			<div
				className={`${styles['left-text-outter-container']} ${ptSans.className}`}>
				<div className={styles['left-text-inner-container']}>
					<h3 className={styles['left-text-container-header']}>{title}</h3>
					<p className={styles['left-text-container-body']}>{description}</p>
				</div>
			</div>

			<div className={styles['skills-container']}>
				{skills.map((service, index) => (
					<SkillItem key={index} skill={service} />
				))}
			</div>
		</div>
	)
}

export default SkillsContainer
