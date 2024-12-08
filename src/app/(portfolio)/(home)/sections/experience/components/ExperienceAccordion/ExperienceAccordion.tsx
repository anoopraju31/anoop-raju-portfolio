'use client'

import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import styles from './styles.module.css'

const ExperienceAccordion = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const toggleAccordion = () => setIsOpen((prev) => !prev)

	return (
		<div className={styles.experience__wrapper}>
			<button className={styles.accordion} onClick={toggleAccordion}>
				<div className={styles.accordion__header}>
					<div className={styles.accordion__title__container}>
						<h4 className={styles.company}>Company Name Lorem ipsum dolor </h4>
						<div className={styles.position__container}>
							<p className={styles.position}> Frontend Developer</p>
							<div className={styles.dot} />
							<p className={styles.duration}> Jan 2022 - Sept 2023</p>
						</div>
					</div>
					<div className={styles.read__more__container}>
						{isOpen ? <FaMinus /> : <FaPlus />}
						<p className={styles.read__more}>Read More</p>
					</div>
				</div>
				<div className={styles.accordion__body}></div>
			</button>
			<div className={styles.divider} />
		</div>
	)
}

export default ExperienceAccordion
