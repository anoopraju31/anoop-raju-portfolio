import { type FC } from 'react'
import { Blogs } from '../../../types'
import { format } from 'date-fns'
import { PT_Sans } from 'next/font/google'
import styles from './styles.module.css'
import Link from 'next/link'

type Props = {
	isMask?: boolean
	blog: Blogs
}

const ptSans = PT_Sans({ weight: '400', subsets: ['latin'] })

const BlogCard: FC<Props> = ({ isMask, blog }) => {
	return (
		<Link href={`/blogs/${blog.slug}`}>
			<div className={` ${isMask ? styles.card__mask : styles.card} ${ptSans.className}`}>
				<div className={styles.badge}>
					<span>{blog.tags?.[0] ?? 'Design'}</span>
				</div>

				<h3 className={styles.card__title}> {blog.title} </h3>

				<div className={styles.card__date}>{format(new Date(blog.date), 'LLLL	d, yyyy')} </div>
			</div>
		</Link>
	)
}

export default BlogCard
