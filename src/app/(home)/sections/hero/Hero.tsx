import HeroBody from './HeroBody'
import HeroMask from './HeroMask'
import styles from './hero.module.css'

const Hero = () => {
	return (
		<section className={styles.main}>
			<HeroMask />
			<HeroBody />
		</section>
	)
}

export default Hero
