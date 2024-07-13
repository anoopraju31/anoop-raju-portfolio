'use client'

import { type FC } from 'react'
import { type ProjectCardProps } from '.'
import useAppDispatch from '@/app/hooks/useAddDispatch'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { mouseEnter, mouseLeave } from '@/app/features/textHoverSlice'
import {
	projectCardMouseEnter,
	projectCardMouseLeave,
} from '@/app/features/projectCardSlice'
import styles from './styles.module.css'

const MaskProductCard: FC<ProjectCardProps> = ({
	id,
	year,
	name,
	tools,
	img,
	alt,
	link,
}) => {
	const dispatch = useAppDispatch()
	const handleMouseMove = () =>
		dispatch(projectCardMouseEnter({ cardId: id, link }))
	const handleMouseLeaveImg = () => dispatch(projectCardMouseLeave())
	const handleClick = () => window.open(link)
	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())

	return (
		<div>
			<div
				onClick={handleClick}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeaveImg}
				className={styles.mask__product__card}>
				<Image
					className={styles.img}
					src={img}
					alt={alt}
					width='800'
					height='600'
				/>
			</div>
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className={styles.container}>
				<div className={styles.tools__container}>
					<p className={styles.tools__wrapper__mask}>{year}</p>
					<p className={styles.tools__wrapper__mask}>{tools}</p>
					<a href={link} className={styles.mask__github}>
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

export default MaskProductCard
