import styles from './hero.module.css'

const HeroMask = () => {
	return (
		<div className={styles.mask}>
			<div className={styles['hero-container']}>
				<div className={styles['hero-heading-container']}>
					<h1 className={styles['hero-heading']}>Anoop</h1>

					<div className={styles['hero-image']} />
					<h1 className={styles['hero-heading']}>Raju</h1>
				</div>

				<div className={styles['hero-subheading-container']}>
					<h2 className={styles['hero-subheading']}>Web Developer</h2>
					<h2 className={styles['hero-subheading']}>Living in Kerala</h2>
				</div>
			</div>
		</div>
	)
}

export default HeroMask
