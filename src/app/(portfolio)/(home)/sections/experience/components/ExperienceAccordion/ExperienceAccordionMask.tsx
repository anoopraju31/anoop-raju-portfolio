'use client'

import { type FC } from 'react'
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch'
import { mouseEnter, mouseLeave } from '@/app/(portfolio)/features/textHoverSlice'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import styles from './styles.module.css'
import { Experience } from '@/utills/constants'
import { toggleAccordion } from '@/app/(portfolio)/features/accordionSlice'
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector'

const ExperienceAccordionMask: FC<Experience> = ({ id, companyName, duration, position, description }) => {
	const dispatch = useAppDispatch()
	const isOpen = useAppSelector((state) => state.accordion.filter((item) => item.id === id))[0].isOpen
	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())
	const toggle = () => dispatch(toggleAccordion({ id }))

	return (
		<div className={styles.experience__wrapper} id={`mask-${id}`}>
			<button className={styles.accordion} onClick={toggle}>
				<div className={styles.accordion__header}>
					<div
						className={styles.accordion__title__container}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<h4 className={styles.company__mask}>{companyName} </h4>
						<div className={styles.position__container}>
							<p className={styles.position__mask}> {position}</p>
							<div className={styles.dot__mask} />
							<p className={styles.duration__mask}> {duration}</p>
						</div>
					</div>

					<div
						className={styles.read__more__container}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						{isOpen ? <FaMinus /> : <FaPlus />}
						<p className={styles.read__more__mask}>Read {isOpen ? 'Less' : 'More'}</p>
					</div>
				</div>
				{isOpen ? <div className={styles.accordion__body}>{description}</div> : null}
			</button>
			<div className={styles.divider__mask} />
		</div>
	)
}

export default ExperienceAccordionMask
