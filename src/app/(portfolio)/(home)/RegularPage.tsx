import { type FC } from 'react'
import { type Blogs } from '../../../../types'
import Hero from './sections/hero/Hero'
import About from './sections/about/About'
import Projects from './sections/projects/ProjectsMain'
import Skills from './sections/skills/SkillsMain'
import Experience from './sections/experience/Experience'
import Blog from './sections/blogs/Blog'

type Props = {
	blogs: Blogs[]
}

const RegularPage: FC<Props> = ({ blogs }) => {
	return (
		<div className='relative'>
			<Hero />
			<Projects />
			<About />
			<Skills />
			<Experience />
			<Blog blogs={blogs} />
		</div>
	)
}

export default RegularPage
