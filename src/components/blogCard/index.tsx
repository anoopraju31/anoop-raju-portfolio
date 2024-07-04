import { PT_Sans } from 'next/font/google'
import { type FC } from 'react'
import styles from './styles.module.css'

type Props = {
	isMask?: boolean
}

const ptSans = PT_Sans({ weight: '400', subsets: ['latin'] })

const BlogCard: FC<Props> = ({ isMask }) => {
	return (
		<div
			className={` ${isMask ? styles.card__mask : styles.card} ${
				ptSans.className
			}`}>
			<div className={styles.badge}>
				<span>design</span>
			</div>

			<h3 className={styles.card__title}>
				{' '}
				10 Tips for elevating your design game{' '}
			</h3>

			<div className={styles.card__date}> June 27, 2024 </div>
		</div>
	)
}

export default BlogCard
