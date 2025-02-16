import { type FC } from 'react'
import { type PostQueryResult } from '../../../../../sanity.types'
import Mask from '@/components/mask'
import styles from './styles.module.css'

type Props = {
	post: PostQueryResult
}

const MaskPage: FC<Props> = ({ post }) => {
	return (
		<div className='absolute top-0 left-0 right-0 w-full'>
			<Mask>
				<div className={styles.section} aria-label='skills'>
					<div className={styles.container}>{post?.title}</div>
				</div>
			</Mask>
		</div>
	)
}

export default MaskPage
