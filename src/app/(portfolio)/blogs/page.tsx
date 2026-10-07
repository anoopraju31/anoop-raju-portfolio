import { type FC } from 'react'
import { type Metadata } from 'next'
import { Gantari } from 'next/font/google'
import { type Blogs } from '../../../../types'
import { sanityFetch } from '@/sanity/lib/live'
import { AllBlogsQuery2 } from '@/sanity/query'
import { Particles } from '@/components/Particles'
import MaskPage from './MaskPage'
import RegularPage from './RegularPage'

const gantari = Gantari({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Blogs | Anoop Raju',
	description:
		'Technical deep-dives, architectural notes, and perspectives on modern frontend engineering, React, Next.js, and interactive WebGL by Anoop Raju.'
}

const BlogsPage: FC = async () => {
	const blogsData: Blogs[] = (await (await sanityFetch({ query: AllBlogsQuery2 })).data) ?? []

	return (
		<main
			className={`relative bg-dark-blue text-white min-h-screen overflow-x-hidden ${gantari.className}`}
		>
			{/* High-tech interactive Particle Canvas Background */}
			<Particles className='fixed inset-0 h-screen z-0 pointer-events-auto' />

			{/* Soft ambient atmospheric radial glows */}
			<div className='pointer-events-none fixed top-1/4 -left-48 w-96 h-96 bg-light-green/[0.03] rounded-full blur-[140px] z-0' />
			<div className='pointer-events-none fixed bottom-1/3 -right-48 w-96 h-96 bg-light-green/[0.03] rounded-full blur-[140px] z-0' />

			{/* Dual-layer interactive SVG Mask and Regular Content */}
			<MaskPage blogs={blogsData} />
			<RegularPage blogs={blogsData} />
		</main>
	)
}

export default BlogsPage
