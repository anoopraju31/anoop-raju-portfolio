import styles from './projects.module.css'

const MaskPage = () => {
	return (
		<div className={styles.mask}>
			<section className={styles.section}>
				<div className={styles['heading-container']}>
					<h1 className={styles.heading}>All Portfolio</h1>
				</div>

				<div className={styles['projects-container']}>
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
					<div className={styles['mask-project-card']} />
				</div>
			</section>
		</div>
	)
}

export default MaskPage
