import Image from 'next/image'
import styles from './hero.module.css'

const HeroBody = () => {
	return (
		<div className={styles.body}>
			<div className={styles['hero-container']}>
				<div className={styles['hero-heading-container']}>
					<h1 className={styles['hero-heading']}>Anoop</h1>
					<Image
						src='/anoop-raju.jpg'
						className='flex-shrink-0 rounded-full overflow-hidden w-[var(--hero-image-width)] xl:w-[240px] h-[var(--hero-image-width)] xl:h-[240px] object-cover'
						alt=''
						width={240}
						height={240}
					/>
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

export default HeroBody
