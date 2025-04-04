import { type FC } from 'react'
import { type PostQueryResult } from '../../../../../sanity.types'
import type { PortableTextBlock } from 'next-sanity'
import { PT_Sans } from 'next/font/google'
import Link from 'next/link'
import Mask from '@/components/mask'
import { MdArrowForwardIos } from 'react-icons/md'
import CustomPortableText from './portable-text'
import styles from './styles.module.css'
import Image from 'next/image'

const ptSans = PT_Sans({ weight: ['700', '400'], subsets: ['latin'] })

type Props = {
	post: PostQueryResult
}

const MaskPage: FC<Props> = ({ post }) => {
	if (!post?._id || !post.slug) return null

	return (
		<div className='absolute top-0 left-0 right-0 w-full'>
			<Mask>
				<div className={`${styles.section} ${ptSans.className}`} aria-label='skills'>
					<div className={styles.container}>
						{/* Breadcrumbs */}
						<div className='w-full px-4 sm:px-0 flex items-center gap-2'>
							<Link className='text-grey-600' href='/'>
								Home
							</Link>
							<MdArrowForwardIos className='text-grey-600' />
							<Link className='text-grey-600' href='/blogs'>
								Blogs
							</Link>
							<MdArrowForwardIos className='text-grey-600' />
							<span className='font-light inline-block md:hidden'>{post.title.slice(0, 15)}...</span>
							<span className='font-light hidden md:inline-block lg:hidden '>
								{post.title.slice(0, 20)}...
							</span>
							<span className='font-light hidden lg:inline-block'>{post.title.slice(0, 25)}...</span>
						</div>

						{/* Title */}
						<header className='w-full vertical-left gap-6'>
							<h1 className='text-[28px] sm:text-[32px] md:text-[36px] lg:text-40 leading-120 font-semibold'>
								{post.title}
							</h1>
						</header>

						<div className='w-full'>
							{post.coverImage ? (
								<Image
									className='w-full h-full object-contain rounded-2xl'
									alt={post.coverImage}
									src={post.coverImage}
									priority
									width={2000}
									height={1000}
								/>
							) : null}
						</div>

						<CustomPortableText value={post.content as PortableTextBlock[]} />

						{post?.conclusion?.length && (
							<article className='w-full p-4 pb-0 md:p-6 md:pb-0 bg-dark-blue rounded-2xl text-white'>
								<h2
									id='conclusion-conclusion-123'
									className='w-full mb-4 sm:mb-5 md:mb-6 lg:mb-7 font-semibold leading-120 text-grey-950 text-[24px] sm:text-[28px] md:text-[32px] lg:text-[35px]'
								>
									Conclusion
								</h2>
								<CustomPortableText
									className='max-w-full'
									value={post.conclusion as PortableTextBlock[]}
								/>
							</article>
						)}
					</div>
				</div>
			</Mask>
		</div>
	)
}

export default MaskPage
