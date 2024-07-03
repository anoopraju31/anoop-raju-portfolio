import { PT_Sans } from 'next/font/google'
import Image from 'next/image'
import styles from './about.module.css'

const ptSans = PT_Sans({ weight: '400', subsets: ['latin'] })

const About = () => {
	return (
		<section className={`${styles.body}  ${ptSans.className}`}>
			<div className={styles['inner-container']}>
				<div className={styles.wrapper}>
					<div className={styles['img-container']}>
						<Image
							src='/anoop-raju.jpg'
							className={styles.img}
							alt=''
							width={600}
							height={500}
						/>
					</div>
				</div>

				<div className={styles.wrapper}>
					<div className={styles['text-container']}>
						<h2 className={styles.heading}> About Me </h2>

						<p className={styles.description}>
							Introducing Paul Vadir, a web design virtuoso based in the heart
							of London. Paul&apos;s journey into the world of web design began
							when he was just a teenager, tinkering with HTML and CSS to bring
							his creative visions to life.
							<br />
							<br />
							With a penchant for creating sleek and user-friendly websites,
							Paul&apos;s work has garnered recognition not only in London but
							also on an international scale. His design philosophy revolves
							around simplicity and aesthetics, transforming intricate concepts
							into visually stunning digital experiences.
							<br />
							<br />
							Outside the world of web design, Paul enjoys exploring the vibrant
							streets of London, finding inspiration in the city&apos;s rich
							history and diverse culture. He firmly believes that a web
							designer&apos;s ability to see beauty in everyday life is a key
							asset in creating exceptional digital experiences.
							<br />
							<br />
							Paul Vadir&apos;s expanding portfolio showcases his talent for
							crafting unique and captivating websites. If you&apos;re in need
							of a digital masterpiece in London, look no further than the
							skilled web designer, Paul Vadir.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
