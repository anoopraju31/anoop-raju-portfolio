import React, { FC } from 'react'
import styles from './blog.module.css'
import Link from 'next/link'

const Blog: FC = () => {
	return (
		<section className={styles.section} aria-label='skills'>
			<div className={styles.container}>
				<div className={styles['heading-container']}>
					<h2 className={styles.heading}> Blogs </h2>
				</div>

				<div className={styles['outter-container']}>
					<div className={styles['inner-container']}></div>

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
