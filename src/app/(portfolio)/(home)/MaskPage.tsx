import { type FC } from 'react'
import { type Blogs } from '../../../../types'
import Mask from '@/components/mask'
import HeroMask from './sections/hero/HeroMask'
import ProjectsMask from './sections/projects/ProjectsMask'
import AboutMask from './sections/about/AboutMask'
import SkillsMask from './sections/skills/SkillsMask'
import BlogMask from './sections/blogs/BlogMask'
import ExperienceMask from './sections/experience/ExperienceMask'

type Props = {
	blogs: Blogs[]
}

const MaskPage: FC<Props> = ({ blogs }) => {
	return (
		<div className='absolute top-0 left-0 right-0 w-full'>
			<Mask>
				<HeroMask />
				<ProjectsMask />
				<AboutMask />
				<SkillsMask />
				<ExperienceMask />
				<BlogMask blogs={blogs} />
			</Mask>
		</div>
	)
}

export default MaskPage
