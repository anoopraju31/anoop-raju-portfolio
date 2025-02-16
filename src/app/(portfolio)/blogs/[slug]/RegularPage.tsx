import { type FC } from 'react'
import { type PostQueryResult } from '../../../../../sanity.types'
import styles from './styles.module.css'

type Props = {
	post: PostQueryResult
}

const RegularPage: FC<Props> = ({ post }) => {
	return (
		<div className={styles.section}>
			<div className={styles.container}>{post?.title}</div>
		</div>
	)
}

export default RegularPage
