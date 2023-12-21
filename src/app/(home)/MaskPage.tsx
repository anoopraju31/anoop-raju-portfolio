import Mask from '@/components/mask'
import AboutMask from './sections/about/AboutMask'
import HeroMask from './sections/hero/HeroMask'

const MaskPage = () => {
	return (
		<div className='absolute top-0 left-0 right-0 w-full'>
			<Mask>
				<HeroMask />
				<AboutMask />
			</Mask>
		</div>
	)
}

export default MaskPage
