import { type FC } from 'react'
import { type Blogs } from '../../../../../../types'
import Link from 'next/link'
import BlogCard from '@/components/blogCard'
import styles from './blog.module.css'

type Props = {
	blogs: Blogs[]
}

const Blog: FC<Props> = ({ blogs }) => {
	return (
		<section className={styles.section} aria-label='skills'>
			<div className={styles.container}>
				<div className={styles['heading-container']}>
					<h2 className={styles.heading}> Latest from Blogs </h2>
				</div>

				<div className={styles['outter-container']}>
					<div className={styles['inner-container']}>
						{blogs.map((blog) => (
							<BlogCard key={blog._id} blog={blog} />
						))}
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
