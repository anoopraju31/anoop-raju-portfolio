'use client'

import React, { FC } from 'react'
import styles from './styles.module.css'
import Image from 'next/image'
import { ProjectCardProps } from '.'
import useAppDispatch from '@/app/hooks/useAddDispatch'
import { mouseEnter, mouseLeave } from '@/app/features/textHoverSlice'
import {
	projectCardMouseEnter,
	projectCardMouseLeave,
} from '@/app/features/projectCardSlice'

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

	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())

	const handleClick = () => window.open(link)

	return (
		<div>
			<div
				onClick={handleClick}
				onMouseMove={() =>
					dispatch(projectCardMouseEnter({ cardId: id, link }))
				}
				onMouseLeave={() => dispatch(projectCardMouseLeave())}
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
				</div>
				<div className={styles.name__container}>
					<h3 className={styles.project__name}>{name}</h3>
				</div>
			</div>
		</div>
	)
}

export default MaskProductCard
