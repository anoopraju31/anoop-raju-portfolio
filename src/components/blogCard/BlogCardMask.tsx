import { type FC } from 'react'
import useAppDispatch from '@/app/hooks/useAddDispatch'
import { PT_Sans } from 'next/font/google'
import { mouseEnter, mouseLeave } from '@/app/features/textHoverSlice'
import styles from './styles.module.css'

type Props = {}

const ptSans = PT_Sans({ weight: '400', subsets: ['latin'] })

const BlogCardMask: FC<Props> = () => {
	const dispatch = useAppDispatch()

	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())
	return (
		<div
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={`${styles.card__mask} ${ptSans.className}`}>
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

export default BlogCardMask
