import { type FC } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiBookOpen } from 'react-icons/fi'
import { type Blogs } from '../../../../../../types'
import BlogCard from '@/components/blogCard'
import styles from './blog.module.css'

type Props = {
	blogs: Blogs[]
}

const TOPICS = [
	{ label: 'Engineering', count: 'Architecture' },
	{ label: 'Frontend', count: 'React & Next.js' },
	{ label: 'Performance', count: 'Optimization' },
	{ label: 'WebGL & UI', count: 'Motion & Canvas' },
]

const Blog: FC<Props> = ({ blogs }) => {
	const displayBlogs = blogs?.slice(0, 3) ?? []

	return (
		<section className={styles.section} aria-label='latest blogs'>
			<div className={styles.container}>
				{/* Section Header */}
				<header className={styles.headingContainer}>
					<div className={`${styles.eyebrowBadge} ${styles.eyebrowBadgeRegular}`}>
						<span className={`${styles.pulseDot} ${styles.pulseDotRegular}`} />
						<span>Editorial &bull; Thoughts, Architecture &amp; Code</span>
					</div>

					<h2 className={`${styles.heading} ${styles.headingRegular}`}>
						Latest Articles{' '}
						<span className={styles.headingHighlightRegular}>&amp; Writings</span>
					</h2>

					<p className={`${styles.subtitle} ${styles.subtitleRegular}`}>
						Deep dives into engineering architecture, web animations, UI/UX aesthetics,
						and scalable fullstack software development.
					</p>

					{/* Topic Highlights Bar */}
					<div className={styles.topicPillsRow}>
						{TOPICS.map((topic, i) => (
							<div key={i} className={`${styles.topicPill} ${styles.topicPillRegular}`}>
								<span className={styles.topicTagRegular}>#{topic.label}</span>
								<span>&bull; {topic.count}</span>
							</div>
						))}
					</div>
				</header>

				{/* Cards Grid */}
				<div className={styles.gridWrapper}>
					{displayBlogs.length > 0 ? (
						<div className={styles.gridContainer}>
							{displayBlogs.map((blog) => (
								<BlogCard key={blog._id} blog={blog} />
							))}
						</div>
					) : (
						<div className='text-center py-16 border border-white/10 rounded-2xl bg-white/[0.02]'>
							<FiBookOpen size={36} className='mx-auto mb-3 text-light-green/60' />
							<p className='text-white/60 font-mono text-sm'>
								Articles coming soon. Check back shortly!
							</p>
						</div>
					)}

					{/* CTA Button */}
					<div className={styles.linkWrapper}>
						<Link href='/blogs' className={`${styles.ctaButton} ${styles.ctaButtonRegular}`}>
							<span>Explore All Articles</span>
							<FiArrowRight size={18} className={styles.ctaArrow} />
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Blog
