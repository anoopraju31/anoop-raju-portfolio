'use client'

import { type FC } from 'react'
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch'
import { mouseEnter, mouseLeave } from '@/app/(portfolio)/features/textHoverSlice'
import { FaPlus } from 'react-icons/fa6'
import styles from './styles.module.css'

const ExperienceAccordionMask = () => {
	const dispatch = useAppDispatch()

	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())

	return (
		<div className={styles.experience__wrapper}>
			<button className={styles.accordion}>
				<div className={styles.accordion__header}>
					<div
						className={styles.accordion__title__container}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<h4 className={styles.company__mask}>Company Name Lorem ipsum dolor </h4>
						<div className={styles.position__container}>
							<p className={styles.position__mask}> Frontend Developer</p>
							<div className={styles.dot__mask} />
							<p className={styles.duration__mask}> Jan 2022 - Sept 2023</p>
						</div>
					</div>
					
					<div
						className={styles.read__more__container}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<FaPlus />
						<p className={styles.read__more__mask}>Read More</p>
					</div>
				</div>
				<div className={styles.accordion__body}></div>
			</button>
			<div className={styles.divider__mask} />
		</div>
	)
}

export default ExperienceAccordionMask
