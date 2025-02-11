import { type FC } from 'react'
import { type Metadata } from 'next'
import { Particles } from '@/components/Particles'
import MaskPage from './MaskPage'
import RegularPage from './RegularPage'

export const metadata: Metadata = {
	title: 'Blogs'
}

const BlogsPage: FC = () => {
	return (
		<main className='bg-dark-blue text-white relative'>
			<Particles className='fixed inset-0 h-screen' />
			<MaskPage />
			<RegularPage />
		</main>
	)
}

export default BlogsPage
