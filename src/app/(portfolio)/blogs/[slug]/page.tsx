import { type FC } from 'react'
import { PostQueryResult } from '../../../../../sanity.types'
import { sanityFetch } from '@/sanity/lib/live'
import { postQuery } from '@/sanity/query'
import { notFound } from 'next/navigation'
import MaskPage from './MaskPage'
import RegularPage from './RegularPage'

type Props = {
	params: { slug: string }
}

export const revalidate = 300

const BlogPostPage: FC<Props> = async ({ params }) => {
	// @ts-ignore
	const post = await sanityFetch<PostQueryResult>({
		query: postQuery,
		params
	})

	if (!post.data?._id) return notFound()

	return (
		<main className='bg-dark-blue text-white relative'>
			<MaskPage post={post.data} />
			<RegularPage post={post.data} />
		</main>
	)
}

export default BlogPostPage
