import { type FC } from 'react'
import { PostQueryResult } from '../../../../../sanity.types'
import { sanityFetch } from '@/sanity/lib/live'
import { postQuery } from '@/sanity/query'
import { notFound } from 'next/navigation'

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
	return <div>{post.data.title}</div>
}

export default BlogPostPage
