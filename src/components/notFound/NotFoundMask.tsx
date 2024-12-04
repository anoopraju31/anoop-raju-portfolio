'use client'

import { type FC } from 'react'
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch'
import Link from 'next/link'
import { mouseEnter, mouseLeave } from '@/app/(portfolio)/features/textHoverSlice'
import styles from './styles.module.css'

const NotFoundMask: FC = () => {
	const dispatch = useAppDispatch()

	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())
	return (
		<section className={styles.mask}>
			<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.container}>
				<div className={styles.heading}>404</div>
				<div className={styles.desc}>Sorry, we couldn&apos;t find this page.</div>
				<Link href='/' className={styles.link}>
					Back to homepage
				</Link>
			</div>
		</section>
	)
}

export default NotFoundMask
