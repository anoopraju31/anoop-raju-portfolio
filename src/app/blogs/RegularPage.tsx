import { type FC } from 'react'
import styles from './styles.module.css'
import BlogCard from '@/components/blogCard'
import Link from 'next/link'

const RegularPage: FC = () => {
	return (
		<section className={styles.section} aria-label='skills'>
			<div className={styles.container}>
				<div className={styles['heading-container']}>
					<h2 className={styles.heading}> Blogs </h2>
				</div>

				<div className={styles['outter-container']}>
					<div className={styles['inner-container']}>
						<BlogCard />
						<BlogCard />
						<BlogCard />
						<BlogCard />
						<BlogCard />
						<BlogCard />
						<BlogCard />
						<BlogCard />
						<BlogCard />
					</div>

					{/* <div className={styles['link-container']}>
						<Link href='/blogs' className={styles['link']}>
							 More Blogs
						</Link>
					</div> */}
				</div>
			</div>
		</section>
	)
}

export default RegularPage
