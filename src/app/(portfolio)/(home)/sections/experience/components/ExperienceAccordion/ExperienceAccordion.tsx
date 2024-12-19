'use client'

import { type FC } from 'react'
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector'
import { AnimatePresence, motion } from 'framer-motion'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { Experience } from '@/utills/constants'
import styles from './styles.module.css'
import { panelVariants } from '@/utills/animations'
import { PT_Sans } from 'next/font/google'

const ptSans = PT_Sans({ weight: '400', subsets: ['latin'] })

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
				<AnimatePresence mode='wait'>
					{isOpen ? (
						<motion.div
							variants={panelVariants}
							initial='closed'
							animate='open'
							exit='closed'
							transition={{ type: 'tween', ease: 'backOut', duration: 1 }}
							className={`${ptSans.className} ${styles.accordion__body}`}
						>
							<ul>
								{description.map((item, index) => (
									<li key={index}>{item}</li>
								))}
							</ul>
						</motion.div>
					) : null}
				</AnimatePresence>
			</button>
			<div className={styles.divider} />
		</div>
	)
}

export default ExperienceAccordion
