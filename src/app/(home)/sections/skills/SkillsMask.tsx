'use client'

import useAppDispatch from '@/app/hooks/useAddDispatch'
import { PT_Sans } from 'next/font/google'
import { mouseEnter, mouseLeave } from '@/app/features/textHoverSlice'
import { skills } from '@/utills/constants'
import styles from './styles.module.css'
import SkillItemMask from './components/skillItem/SkillItemMask'

const ptSans = PT_Sans({ weight: '400', subsets: ['latin'] })

const SkillsMask = () => {
	const dispatch = useAppDispatch()

	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())

	return (
		<div className={styles.section} aria-label='skills mask'>
			<div className={styles.container}>
				<div className={styles['heading-container']}>
					<h2
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={styles.heading}>
						Skills
					</h2>
				</div>

				<div className={styles['text-container']}>
					<div
						className={` ${styles['left-text-outter-container']} ${ptSans.className}`}>
						<div
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							className={styles['left-text-inner-container']}>
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
						{skills.map((item, index) => (
							<SkillItemMask key={index} skill={item} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SkillsMask
