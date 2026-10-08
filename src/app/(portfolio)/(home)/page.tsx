import { sanityFetch } from '@/sanity/lib/live'
import { AllBlogsQuery2 } from '@/sanity/query'
import type { Blogs } from '../../../../types'
import SmoothScrollLenis from '@/components/SmoothScrollLenis'
import { Particles } from '@/components/Particles'
import MaskPage from './MaskPage'
import RegularPage from './RegularPage'

export default async function Home() {
	const blogsData: Blogs[] = await (await sanityFetch({ query: AllBlogsQuery2 })).data.slice(0, 3)

	return (
		<SmoothScrollLenis>
			<main className='bg-dark-blue text-white relative'>
				<Particles className='fixed inset-0 h-screen z-0 pointer-events-auto' />
				<MaskPage blogs={blogsData} />
				<RegularPage blogs={blogsData} />
			</main>
		</SmoothScrollLenis>
	)
}
