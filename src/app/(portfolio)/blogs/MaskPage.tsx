'use client'

import { type FC } from 'react'
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch'
import { mouseEnter, mouseLeave } from '@/app/(portfolio)/features/textHoverSlice'
import styles from './styles.module.css'
import BlogCard from '@/components/blogCard'
import Mask from '@/components/mask'
import { Blogs } from '../../../../types'

type Props = {
	blogs: Blogs[]
}

const MaskPage: FC<Props> = ({ blogs }) => {
	const dispatch = useAppDispatch()

	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())

	return (
		<div className='absolute top-0 left-0 right-0 w-full'>
			<Mask>
				<div className={styles.section} aria-label='skills'>
					<div className={styles.container}>
						<div className={styles['heading-container']}>
							<h2
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								className={styles.heading}
							>
								Blogs
							</h2>
						</div>

						<div className={styles['outter-container']}>
							<div
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								className={styles['inner-container']}
							>
								{blogs.map((blog) => (
									<BlogCard isMask key={blog._id} blog={blog} />
								))}
							</div>

							{/* <div className={styles['link-container']}>
								<Link
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
									href='/blogs'
									className={styles['link-mask']}>
									View More Blogs
								</Link>
							</div> */}
						</div>
					</div>
				</div>
			</Mask>
		</div>
	)
}

export default MaskPage
