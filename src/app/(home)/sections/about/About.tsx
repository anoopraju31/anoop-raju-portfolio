import { PT_Sans } from 'next/font/google'
import Image from 'next/image'
import styles from './about.module.css'

const ptSans = PT_Sans({ weight: '400', subsets: ['latin'] })

const About = () => {
	return (
		<section className={`${styles.body}`}>
			<div className={styles['inner-container']}>
				<div className={styles.wrapper}>
					<div className={`hidden md:block ${styles['img-container']}`}>
						<Image
							src='/anoop-raju.jpg'
							alt='anoop raju'
							width={400}
							height={400}
							className={styles.img}
						/>
					</div>
				</div>
				<div className={`${styles.wrapper} ${ptSans.className}`}>
					<div className={styles['text-container']}>
						<h2 className={styles.heading}> About Me </h2>

						<div className={`md:hidden ${styles['img-container']} mb-10`}>
							<Image
								src='/anoop-raju.jpg'
								alt='anoop raju'
								width={400}
								height={400}
								className={`${styles.img} aspect-square`}
							/>
						</div>
						<p className={styles.description}>
							Hello! I&apos;m a passionate Software Developer with a knack for
							crafting sleek and scalable frontend applications. With a flair
							for web design and a dedication to creating seamless user
							experiences, I turn ideas into visually appealing and functional
							digital realities.
						</p>

						<p className={styles.description}>
							As a recent graduate of the Indian Institute of Information
							Technology, Kottayam, I&apos;ve honed my skills in both the
							theoretical and practical aspects of web development. My journey
							in tech is fueled by a constant quest for knowledge and growth,
							always ready to embrace the next big challenge.
						</p>

						<p className={styles.description}>
							When I&apos;m not coding, you can find me exploring the latest
							design trends, diving into new technologies, or dreaming up
							innovative ways to improve the digital landscape. Let&apos;s build
							something amazing together!
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
