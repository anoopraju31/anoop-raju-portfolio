'use client'

import { type FC } from 'react'
import useAppDispatch from '@/app/hooks/useAddDispatch'
import Link from 'next/link'
import BlogCardMask from '@/components/blogCard/BlogCardMask'
import { mouseEnter, mouseLeave } from '@/app/features/textHoverSlice'
import styles from './blog.module.css'

const BlogMask: FC = () => {
	const dispatch = useAppDispatch()

	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())

	return (
		<div className={styles.section} aria-label='skills'>
			<div className={styles.container}>
				<div className={styles['heading-container']}>
					<h2
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={styles.heading}>
						{' '}
						Latest from Blogs{' '}
					</h2>
				</div>

				<div className={styles['outter-container']}>
					<div
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={styles['inner-container']}>
						<BlogCardMask />
						<BlogCardMask />
						<BlogCardMask />
					</div>

					<div className={styles['link-container']}>
						<Link
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							href='/blogs'
							className={styles['link']}>
							View More Blogs
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BlogMask
