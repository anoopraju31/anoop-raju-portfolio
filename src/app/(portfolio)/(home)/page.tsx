import { sanityFetch } from '@/sanity/lib/live'
import { AllBlogsQuery2 } from '@/sanity/query'
import { Blogs } from '../../../../types'
import { Particles } from '@/components/Particles'
import MaskPage from './MaskPage'
import RegularPage from './RegularPage'

export default async function Home() {
	const blogsData: Blogs[] = await (await sanityFetch({ query: AllBlogsQuery2 })).data.slice(0, 3)

	return (
		<main className='bg-dark-blue text-white relative'>
			<Particles className='fixed inset-0 h-screen' />
			<MaskPage blogs={blogsData} />
			<RegularPage blogs={blogsData} />
		</main>
	)
}
