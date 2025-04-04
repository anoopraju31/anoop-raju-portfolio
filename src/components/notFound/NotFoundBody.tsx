import { type FC } from 'react'
import Link from 'next/link'
import styles from './styles.module.css'

const NotFoundBody: FC = () => {
	return (
		<section className={styles.body}>
			<div className={styles.container}>
				<h1 className={styles.heading}>404</h1>
				<p className={styles.desc}>Sorry, we couldn&apos;t find this page.</p>
				<Link href='/' className={styles.link}>
					Back to homepage
				</Link>
			</div>
		</section>
	)
}

export default NotFoundBody
