import ProjectCard from '@/components/projectCard/ProjectCard'
import styles from './projects.module.css'

const RegularPage = () => {
	return (
		<div className={styles.main}>
			<section className={styles.section}>
				<div className={styles['heading-container']}>
					<h1 className={styles.heading}>All Portfolio</h1>
				</div>

				<div className={styles['projects-container']}>
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
					<ProjectCard img='/nike.png' />
				</div>
			</section>
		</div>
	)
}

export default RegularPage
