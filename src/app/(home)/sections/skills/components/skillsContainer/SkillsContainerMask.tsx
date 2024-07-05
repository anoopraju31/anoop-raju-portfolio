import { type FC } from 'react'
import { PT_Sans } from 'next/font/google'
import useAppDispatch from '@/app/hooks/useAddDispatch'
import { mouseEnter, mouseLeave } from '@/app/features/textHoverSlice'
import SkillItemMask from '../skillItem/SkillItemMask'
import styles from './styles.module.css'

type Props = {
	title: string
	description: string
	skills: string[]
}

const ptSans = PT_Sans({ weight: '400', subsets: ['latin'] })

const SkillsContainerMask: FC<Props> = ({ title, description, skills }) => {
	const dispatch = useAppDispatch()

	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())

	return (
		<div className={styles['text-container']}>
			<div
				className={`${styles['left-text-outter-container']} ${ptSans.className}`}>
				<div className={styles['left-text-inner-container']}>
					<h3
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={styles['left-text-container-header']}>
						{title}
					</h3>
					<p
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={styles['left-text-container-body']}>
						{description}
					</p>
				</div>
			</div>

			<div className={styles['skills-container']}>
				{skills.map((service, index) => (
					<SkillItemMask key={index} skill={service} />
				))}
			</div>
		</div>
	)
}

export default SkillsContainerMask
