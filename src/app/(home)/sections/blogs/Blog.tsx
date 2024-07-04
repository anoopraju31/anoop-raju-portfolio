import { type FC } from 'react'
import Link from 'next/link'
import BlogCard from '@/components/blogCard/BlogCard'
import styles from './blog.module.css'

const Blog: FC = () => {
	return (
		<section className={styles.section} aria-label='skills'>
			<div className={styles.container}>
				<div className={styles['heading-container']}>
					<h2 className={styles.heading}> Latest from Blogs </h2>
				</div>

				<div className={styles['outter-container']}>
					<div className={styles['inner-container']}>
						<BlogCard />
						<BlogCard />
						<BlogCard />
					</div>

					<div className={styles['link-container']}>
						<Link href='/blogs' className={styles['link']}>
							View More Blogs
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Blog
