import { type FC } from 'react'
import type { PostQueryResult } from '../../../../../sanity.types'
import { sanityFetch } from '@/sanity/lib/live'
import { postQuery } from '@/sanity/query'
import { notFound } from 'next/navigation'
import RegularPage from './RegularPage'

// export const dynamic = 'force-dynamic'

// Force dynamic params so ISR works for new posts
export const dynamicParams = true

// Cache invalidation interval
export const revalidate = 300

type Props = {
	params: Promise<{ slug: string }>
}

const BlogPostPage: FC<Props> = async ({ params }) => {
	// @ts-ignore
	const post = await sanityFetch<PostQueryResult>({
		query: postQuery,
		params: await params
	})

	if (!post.data?._id) return notFound()

	return (
		<main className='bg-dark-blue text-white relative'>
			<RegularPage post={post.data} />
		</main>
	)
}

export default BlogPostPage
