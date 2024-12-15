'use client'

import { type FC } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import styles from './styles.module.css'
import { Experience } from '@/utills/constants'
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector'

const ExperienceAccordion: FC<Experience> = ({ id, companyName, position, duration, description }) => {
	const isOpen = useAppSelector((state) => state.accordion.filter((item) => item.id === id))[0].isOpen

	return (
		<div className={styles.experience__wrapper} id={id}>
			<button className={styles.accordion}>
				<div className={styles.accordion__header}>
					<div className={styles.accordion__title__container}>
						<h4 className={styles.company}>{companyName} </h4>
						<div className={styles.position__container}>
							<p className={styles.position}> {position}</p>
							<div className={styles.dot} />
							<p className={styles.duration}>{duration}</p>
						</div>
					</div>
					<div className={styles.read__more__container}>
						{isOpen ? <FaMinus /> : <FaPlus />}
						<p className={styles.read__more}>Read {isOpen ? 'Less' : 'More'}</p>
					</div>
				</div>
				{isOpen? <div className={styles.accordion__body}>{description}</div> : null}
			</button>
			<div className={styles.divider} />
		</div>
	)
}

export default ExperienceAccordion
