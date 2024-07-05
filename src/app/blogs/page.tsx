import { FC } from 'react'
import MaskPage from './MaskPage'
import RegularPage from './RegularPage'
import { Particles } from '@/components/Particles'

const BlogsPage: FC = () => {
	return (
		<main className='bg-dark-blue text-white relative z-10'>
			<Particles className='fixed inset-0 -z-10 h-screen' />
			<MaskPage />
			<RegularPage />
		</main>
	)
}

export default BlogsPage
