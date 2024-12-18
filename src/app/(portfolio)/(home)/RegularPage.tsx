import React from 'react'
import Hero from './sections/hero/Hero'
import About from './sections/about/About'
import Projects from './sections/projects/ProjectsMain'
import Skills from './sections/skills/SkillsMain'
import Blog from './sections/blogs/Blog'
import Experience from './sections/experience/Experience'

const RegularPage = () => {
	return (
		<div className='relative'>
			<Hero />
			<Projects />
			<About />
			<Skills />
			<Experience />
			<Blog />
		</div>
	)
}

export default RegularPage