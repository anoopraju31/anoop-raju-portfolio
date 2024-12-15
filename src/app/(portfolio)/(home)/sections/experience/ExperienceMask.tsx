'use client'

import { type FC } from 'react'
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch'
import Link from 'next/link'
import { mouseEnter, mouseLeave } from '@/app/(portfolio)/features/textHoverSlice'
import styles from './styles.module.css'
import ExperienceAccordionMask from './components/ExperienceAccordion/ExperienceAccordionMask'
import { accordionData } from '@/utills/constants'

const ExperienceMask: FC = () => {
	const dispatch = useAppDispatch()

	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())

	return (
		<div className={styles.section}>
			<div className={styles.container}>
				<div className={styles['heading-container']}>
					<h2 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.heading}>
						My Experience
					</h2>
				</div>

				<div className={styles['outter-container']}>
					{accordionData.map((data) => (
						<ExperienceAccordionMask key={data.id} {...data} />
					))}
				</div>
			</div>
		</div>
	)
}

export default ExperienceMask
