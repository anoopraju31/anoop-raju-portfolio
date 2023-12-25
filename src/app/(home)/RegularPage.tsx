import React from 'react'
import Hero from './sections/hero/Hero'
import About from './sections/about/About'
import Projects from './sections/projects/ProjectsMain'
import Skills from './sections/skills/SkillsMain'

const RegularPage = () => {
	return (
		<div className='relative'>
			<Hero />
			<Projects />
			<About />
			<Skills />
		</div>
	)
}

export default RegularPage
