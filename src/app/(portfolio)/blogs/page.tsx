import { type FC } from 'react'
import { type Metadata } from 'next'
import { type Blogs } from '../../../../types'
import { sanityFetch } from '@/sanity/lib/live'
import { AllBlogsQuery2 } from '@/sanity/query'
import { Particles } from '@/components/Particles'
import MaskPage from './MaskPage'
import RegularPage from './RegularPage'

export const metadata: Metadata = {
	title: 'Blogs',
	description: 'all blogs'
}

const BlogsPage: FC = async () => {
	const blogsData: Blogs[] = await (await sanityFetch({ query: AllBlogsQuery2 })).data
	return (
		<main className='bg-dark-blue text-white relative'>
			<Particles className='fixed inset-0 h-screen' />
			<MaskPage blogs={blogsData} />
			<RegularPage blogs={blogsData} />
		</main>
	)
}

export default BlogsPage
