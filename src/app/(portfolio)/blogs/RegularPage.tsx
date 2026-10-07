'use client';

import { type FC } from 'react'
import Link from 'next/link'
import { FiArrowUpRight, FiBookOpen } from 'react-icons/fi'
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch'
import { mouseEnter, mouseLeave } from '@/app/(portfolio)/features/textHoverSlice'
import BlogCard from '@/components/blogCard'
import MagneticContainer from '@/components/MagneticContainer'
import { Blogs } from '../../../../types'
import styles from './styles.module.css'

type Props = {
	blogs: Blogs[]
}

const RegularPage: FC<Props> = ({ blogs }) => {
	const dispatch = useAppDispatch()
	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())
	const countDisplay = blogs?.length ? String(blogs.length).padStart(2, '0') : '00'

	return (
		<section className={styles.section} aria-label='blogs'>
			<div className={styles.container}>
				{/* Hero Header Section */}
				<header className={styles.heroSection}>
					<div className={`${styles.eyebrowBadge} ${styles.eyebrowBadgeRegular}`}>
						<span className={`${styles.pulseDot} ${styles.pulseDotRegular}`} />
						<span>Engineering Journal &bull; Insights &amp; Tech</span>
					</div>

					<h1 className={`${styles.mainHeading} ${styles.headingRegular}`}>
						Articles, Notes{' '}
						<span className={styles.headingHighlightRegular}>&amp; Studies</span>
					</h1>

					<p className={`${styles.heroSubtitle} ${styles.heroSubtitleRegular}`}>
						Technical deep-dives into modern web architecture, frontend performance,
						React internals, generative UI, and software engineering philosophy.
					</p>

					{/* Quick Stats Bar */}
					<div className={styles.statsBar}>
						<div className={`${styles.statItem} ${styles.statItemRegular}`}>
							<span className={styles.statNumberRegular}>{countDisplay}</span>
							<span>Articles Published</span>
						</div>
						<div className={`${styles.statItem} ${styles.statItemRegular}`}>
							<span className={styles.statNumberRegular}>Next.js &bull; React</span>
							<span>Frontend Core</span>
						</div>
						<div className={`${styles.statItem} ${styles.statItemRegular}`}>
							<span className={styles.statNumberRegular}>WebGL &bull; Kinetic</span>
							<span>Interactive UI</span>
						</div>
					</div>
				</header>

				{/* Articles Showcase Grid */}
				{blogs && blogs.length > 0 ? (
					<div className={styles.blogGrid}>
						{blogs.map((blog) => (
							<div
								key={blog._id}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								className='h-full'
							>
								<BlogCard blog={blog} />
							</div>
						))}
					</div>
				) : (
					<div className={`${styles.emptyState} ${styles.emptyStateRegular}`}>
						<FiBookOpen size={48} className='text-light-green mb-4 opacity-70' />
						<h3 className={styles.emptyTitle}>New Articles in Progress</h3>
						<p className={styles.emptyDescription}>
							Technical articles exploring performance tuning, state management, and
							bespoke animations are currently being written. Stay tuned!
						</p>
					</div>
				)}

				{/* Bottom CTA Banner */}
				<section className={`${styles.bottomCtaSection} ${styles.bottomCtaSectionRegular}`}>
					<span className={`${styles.ctaEyebrow} ${styles.ctaEyebrowRegular}`}>
						Have questions or thoughts?
					</span>
					<h2 className={`${styles.ctaTitle} ${styles.ctaTitleRegular}`}>
						Let&apos;s start a conversation
					</h2>
					<p className={`${styles.ctaDescription} ${styles.ctaDescriptionRegular}`}>
						Interested in discussing an engineering topic, technical collaboration, or
						exploring opportunities together?
					</p>
					<div className={styles.ctaButtonWrapper}>
						<MagneticContainer>
							<Link
								href='/contact'
								className={`${styles.ctaButton} ${styles.ctaButtonRegular}`}
							>
								<span>Get in Touch</span>
								<FiArrowUpRight size={18} />
							</Link>
						</MagneticContainer>
					</div>
				</section>
			</div>
		</section>
	)
}

export default RegularPage
