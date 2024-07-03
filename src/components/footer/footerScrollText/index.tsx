import ScrollText from './scrollText'
import styles from './styles.module.css'

const FooterScrollText = () => {
	return (
		<div className={styles['outter-container']}>
			<div className={styles['inner-container']}>
				<ScrollText text="Let's talk" />
				<ScrollText text="Let's talk" />
				<ScrollText text="Let's talk" />
				<ScrollText text="Let's talk" />
				<ScrollText text="Let's talk" />
			</div>
			<div className={styles['inner-container']}>
				<ScrollText text="Let's talk" />
				<ScrollText text="Let's talk" />
				<ScrollText text="Let's talk" />
				<ScrollText text="Let's talk" />
				<ScrollText text="Let's talk" />
			</div>
		</div>
	)
}

export default FooterScrollText
