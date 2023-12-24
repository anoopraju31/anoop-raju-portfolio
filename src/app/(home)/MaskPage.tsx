import Mask from '@/components/mask'
import HeroMask from './sections/hero/HeroMask'
import ProjectsMask from './sections/projects/ProjectsMask'
import AboutMask from './sections/about/AboutMask'

const MaskPage = () => {
	return (
		<div className='absolute top-0 left-0 right-0 w-full'>
			<Mask>
				<HeroMask />
				<ProjectsMask />
				<AboutMask />
			</Mask>
		</div>
	)
}

export default MaskPage
