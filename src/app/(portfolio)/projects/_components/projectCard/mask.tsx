'use client'

import { type FC } from 'react'
import { type ProjectCardProps } from '.'
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import { mouseEnter, mouseLeave } from '@/app/(portfolio)/features/textHoverSlice'
import {
	projectCardMouseEnter,
	projectCardMouseLeave
} from '@/app/(portfolio)/features/projectCardSlice'
import styles from './styles.module.css'

const MaskProductCard: FC<ProjectCardProps> = ({
	id,
	number,
	name,
	subtitle,
	description,
	img,
	alt,
	tools,
	year,
	link,
	github,
	category,
	featured,
	siteDomain
}) => {
	const dispatch = useAppDispatch()

	const handleMouseMove = () => dispatch(projectCardMouseEnter({ cardId: id, link }))
	const handleMouseLeaveImg = () => dispatch(projectCardMouseLeave())
	const handleClick = () => {
		if (link) window.open(link, '_blank', 'noopener,noreferrer')
	}
	const handleTextMouseEnter = () => dispatch(mouseEnter())
	const handleTextMouseLeave = () => dispatch(mouseLeave())

	const toolsList = Array.isArray(tools) ? tools : tools.split('•').map((t) => t.trim())
	const displayDomain = siteDomain || link.replace(/^https?:\/\//, '').replace(/\/$/, '')

	return (
		<div className={styles.cardWrapper}>
			{/* Browser Chrome Header */}
			<div className={`${styles.chromeBar} ${styles.chromeBarMask}`}>
				<div className={styles.windowDots}>
					<span className={`${styles.windowDot} ${styles.windowDotRed}`} />
					<span className={`${styles.windowDot} ${styles.windowDotYellow}`} />
					<span className={`${styles.windowDot} ${styles.windowDotGreen}`} />
				</div>
				<span className={`${styles.windowUrl} ${styles.windowUrlMask}`}>{displayDomain}</span>
				<span className='font-mono text-[11px] text-dark-blue/60'>{year}</span>
			</div>

			{/* Interactive Image Frame (Mask Trigger) */}
			<div
				onClick={handleClick}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeaveImg}
				className={`${styles.imageFrame} ${styles.imageFrameMask}`}
			>
				{featured && (
					<div className={`${styles.floatingBadge} ${styles.floatingBadgeMask}`}>
						<span className='w-1.5 h-1.5 rounded-full bg-dark-blue' />
						<span>Featured Case Study</span>
					</div>
				)}

				<div className={styles.imageAspect}>
					<div className='w-full h-full'>
						<Image
							className={`${styles.img} ${styles.imgMask}`}
							src={img}
							alt={alt}
							width={1200}
							height={750}
							priority={id === 1}
						/>
					</div>
					<div className={`${styles.imageOverlay} ${styles.imageOverlayMask}`} />
				</div>
			</div>

			{/* Card Details & Metadata */}
			<div
				onMouseEnter={handleTextMouseEnter}
				onMouseLeave={handleTextMouseLeave}
				className={styles.detailsContainer}
			>
				<div className={`${styles.metaHeader} ${styles.metaHeaderMask}`}>
					<span className={styles.numberBadgeMask}>{number || `0${id}`}</span>
					{category && (
						<span className={`${styles.categoryPill} ${styles.categoryPillMask}`}>
							{category}
						</span>
					)}
				</div>

				<div className={styles.titleGroup}>
					<h3 className={`${styles.projectName} ${styles.projectNameMask}`}>{name}</h3>
					{subtitle && (
						<p className={`${styles.projectSubtitle} ${styles.projectSubtitleMask}`}>
							{subtitle}
						</p>
					)}
				</div>

				{description && (
					<p className={`${styles.projectDescription} ${styles.projectDescriptionMask}`}>
						{description}
					</p>
				)}

				{/* Tech Stack Pills */}
				<div className={styles.tagsContainer}>
					{toolsList.map((tool, idx) => (
						<span key={idx} className={`${styles.tagPill} ${styles.tagPillMask}`}>
							{tool}
						</span>
					))}
				</div>

				{/* Action Links */}
				<div className={styles.actionsRow}>
					{link && (
						<a
							href={link}
							target='_blank'
							rel='noopener noreferrer'
							className={`${styles.actionButton} ${styles.actionPrimaryMask}`}
						>
							<span>Live Preview</span>
							<FiArrowUpRight size={16} />
						</a>
					)}
					{github && (
						<a
							href={github}
							target='_blank'
							rel='noopener noreferrer'
							className={`${styles.actionButton} ${styles.actionSecondaryMask}`}
							title='View Source Code'
						>
							<FaGithub size={16} />
							<span>Repository</span>
						</a>
					)}
				</div>
			</div>
		</div>
	)
}

export default MaskProductCard
