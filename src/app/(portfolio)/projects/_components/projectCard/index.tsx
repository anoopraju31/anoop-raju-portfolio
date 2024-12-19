'use client'

import { type FC } from 'react'
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import styles from './styles.module.css'

export type ProjectCardProps = {
	id: number
	name: string
	img: string
	alt: string
	link: string
	year: string
	tools: string
}

const ProjectCard: FC<ProjectCardProps> = ({ id, name, img, alt, tools, year, link }) => {
	const currentCardId = useAppSelector((state) => state.projectCardHover.cardId)

	return (
		<div>
			<motion.div
				initial={{ borderRadius: 0 }}
				animate={{
					borderRadius: currentCardId == id ? '32px' : 0
				}}
				transition={{
					duration: 0.7,
					ease: 'easeInOut'
				}}
				className={styles.product__card}
			>
				<motion.div
					initial={{
						scale: 1
					}}
					animate={{
						scale: currentCardId === id ? 1.05 : 1
					}}
					transition={{
						duration: 0.7,
						ease: 'easeInOut'
					}}
				>
					<Image className={styles.img} src={img} alt={alt} width='800' height='600' />
				</motion.div>
			</motion.div>
			<div className={styles.container}>
				<div className={styles.tools__container}>
					<p className={styles.tools__wrapper}>{year}</p>
					<p className={styles.tools__wrapper}>{tools}</p>
					<a href={link} className={styles.github}>
						<FaGithub />
					</a>
				</div>
				<div className={styles.name__container}>
					<h3 className={styles.project__name}>{name}</h3>
				</div>
			</div>
		</div>
	)
}

export default ProjectCard
