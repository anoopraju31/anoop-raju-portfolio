'use client';

import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'
import MagneticContainer from '@/components/MagneticContainer'
import ProjectCard from '../_components/projectCard'
import { projectsList } from '../data/projectsData'
import styles from './projects.module.css'

const gridContainerClasses = [
	styles.project1__container,
	styles.project2__container,
	styles.project3__container,
	styles.project4__container,
	styles.project5__container
]

const RegularPage = () => {
	return (
		<main className={styles.regularPage}>
			<section className={styles.container}>
				{/* Hero Header Section */}
				<header className={styles.heroSection}>
					<div className={`${styles.eyebrowBadge} ${styles.eyebrowBadgeRegular}`}>
						<span className={`${styles.pulseDot} ${styles.pulseDotRegular}`} />
						<span>Selected Works &bull; 2023 &mdash; Present</span>
					</div>

					<h1 className={`${styles.mainHeading} ${styles.headingRegular}`}>
						Featured Work{' '}
						<span className={styles.headingHighlightRegular}>&amp; Systems</span>
					</h1>

					<p className={`${styles.heroSubtitle} ${styles.heroSubtitleRegular}`}>
						A curated collection of full-stack web applications, bespoke user
						interfaces, and generative digital experiments engineered with performance,
						accessibility, and kinetic craft.
					</p>

					{/* Quick Metrics Bar */}
					<div className={styles.statsBar}>
						<div className={`${styles.statItem} ${styles.statItemRegular}`}>
							<span className={styles.statNumberRegular}>05</span>
							<span>Curated Builds</span>
						</div>
						<div className={`${styles.statItem} ${styles.statItemRegular}`}>
							<span className={styles.statNumberRegular}>100%</span>
							<span>TypeScript</span>
						</div>
						<div className={`${styles.statItem} ${styles.statItemRegular}`}>
							<span className={styles.statNumberRegular}>React &bull; Next.js</span>
							<span>Core Stack</span>
						</div>
						<div className={`${styles.statItem} ${styles.statItemRegular}`}>
							<span className={styles.statNumberRegular}>OpenAI &bull; WebGL</span>
							<span>Integrations</span>
						</div>
					</div>
				</header>

				{/* Asymmetrical Project Showcase Grid */}
				<div className={styles.project__container}>
					{projectsList.map((project, index) => {
						const containerClass = gridContainerClasses[index] || styles.project1__container
						return (
							<div key={project.id} className={containerClass}>
								<ProjectCard
									id={project.id}
									number={project.number}
									name={project.name}
									subtitle={project.subtitle}
									description={project.description}
									img={project.img}
									alt={project.alt}
									link={project.link}
									github={project.github}
									year={project.year}
									category={project.category}
									tools={project.tools}
									featured={project.featured}
									siteDomain={project.siteDomain}
								/>
							</div>
						)
					})}
				</div>

				{/* Bottom Call To Action Banner */}
				<section className={`${styles.bottomCtaSection} ${styles.bottomCtaSectionRegular}`}>
					<span className={`${styles.ctaEyebrow} ${styles.ctaEyebrowRegular}`}>
						Have a vision in mind?
					</span>
					<h2 className={`${styles.ctaTitle} ${styles.ctaTitleRegular}`}>
						Let&apos;s build something extraordinary together
					</h2>
					<p className={`${styles.ctaDescription} ${styles.ctaDescriptionRegular}`}>
						Available for select freelance contracts, high-impact frontend roles, and
						creative software collaborations.
					</p>
					<div className={styles.ctaButtonWrapper}>
						<Link
							href='/contact'
							className={`${styles.ctaButton} ${styles.ctaButtonRegular}`}
						>
							<span>Start a Conversation</span>
							<FiArrowUpRight size={18} />
						</Link>
					</div>
				</section>
			</section>
		</main>
	)
}

export default RegularPage
