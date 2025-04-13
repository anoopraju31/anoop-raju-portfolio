/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

'use client'

import { useEffect } from 'react'
import { urlForImage } from '@/sanity/lib/utils'
import Image from 'next/image'
import { PortableText, type PortableTextComponents, type PortableTextBlock } from 'next-sanity'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

interface TableRow {
	_key: string
	cells: string[]
}

interface TableValue {
	rows: TableRow[]
}

export default function CustomPortableText({ className, value }: { className?: string; value: PortableTextBlock[] }) {
	useEffect(() => {
		Prism.highlightAll()
	}, [value])

	const components: PortableTextComponents = {
		list: {
			bullet: ({ children }) => {
				return (
					<ul className='list-disc marker:text-grey-950 list-inside ps-0 pe-0 px-0 text-grey-950'>
						{children}
					</ul>
				)
			},
			number: ({ children }) => {
				return (
					<ol className='list-decimal marker:text-grey-950 list-inside pe-0 ps-0 px-0 text-grey-950'>
						{children}
					</ol>
				)
			}
		},
		block: {
			h1: ({ children }) => (
				<h1
					// @ts-expect-error - children array might be empty or props may be null
					id={`${children[0].props?.text
						.replace(/\s+/g, '-')
						.replace(/[^a-zA-Z0-9-]/g, '')
						// @ts-expect-error - children array might be empty or props may be null
						.toLowerCase()}-${children[0].key}`}
					className='w-full mt-5 mb-5 sm:mt-6 sm:mb-6 md:mt-7 md:mb-7 lg:mt-8 lg:mb-8 font-semibold leading-120 text-grey-950 text-[28px] sm:text-[32px] md:text-[36px] lg:text-40'
				>
					{children}
				</h1>
			),
			h2: ({ children }) => (
				<h2
					// @ts-expect-error - children array might be empty or props may be null
					id={`${children[0].props?.text
						.replace(/\s+/g, '-')
						.replace(/[^a-zA-Z0-9-]/g, '')
						// @ts-expect-error - children array might be empty or props may be null
						.toLowerCase()}-${children[0].key}`}
					className='w-full mt-4 mb-4 sm:mt-5 sm:mb-5 md:mt-6 md:mb-6 lg:mt-7 lg:mb-7 font-semibold leading-120 text-grey-950 text-[24px] sm:text-[28px] md:text-[32px] lg:text-[35px]'
				>
					{children}
				</h2>
			),
			h3: ({ children }) => (
				<h3
					// @ts-expect-error - children array might be empty or props may be null
					id={`${children[0].props?.text
						.replace(/\s+/g, '-')
						.replace(/[^a-zA-Z0-9-]/g, '')
						// @ts-expect-error - children array might be empty or props may be null
						.toLowerCase()}-${children[0].key}`}
					className='w-full mt-4 mb-4 sm:mt-5 sm:mb-5 md:mt-6 md:mb-6 lg:mt-7 lg:mb-7 font-semibold leading-120 text-grey-950 text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px]'
				>
					{children}
				</h3>
			),
			h4: ({ children }) => (
				<h4
					// @ts-expect-error - children array might be empty or props may be null
					id={`${children[0].props?.text
						.replace(/\s+/g, '-')
						.replace(/[^a-zA-Z0-9-]/g, '')
						// @ts-expect-error - children array might be empty or props may be null
						.toLowerCase()}-${children[0].key}`}
					className='w-full mt-3 mb-3 sm:mt-4 sm:mb-4 md:mt-5 md:mb-5 lg:mt-6 lg:mb-6 font-semibold leading-120 text-grey-950 text-[20px] sm:text-[24px] md:-text-[28px] lg:text-[30px]'
				>
					{children}
				</h4>
			),
			h5: ({ children }) => (
				<h5
					// @ts-expect-error - children array might be empty or props may be null
					id={`${children[0].props?.text
						.replace(/\s+/g, '-')
						.replace(/[^a-zA-Z0-9-]/g, '')
						// @ts-expect-error - children array might be empty or props may be null
						.toLowerCase()}-${children[0].key}`}
					className='mt-3 mb-3 sm:mt-4 sm:mb-4 md:mt-5 md:mb-5 lg:mt-6 lg:mb-6 font-semibold w-full text-grey-950 text-lg sm:text-[22px] md:text-[26px] lg:text-[28px] '
				>
					{children}
				</h5>
			),
			h6: ({ children }) => (
				<h6
					// @ts-expect-error - children array might be empty or props may be null
					id={`${children[0].props?.text
						.replace(/\s+/g, '-')
						.replace(/[^a-zA-Z0-9-]/g, '')
						// @ts-expect-error - children array might be empty or props may be null
						.toLowerCase()}-${children[0].key}`}
					className='mt-2 mb-2 sm:mt-3 sm:mb-3 md:mt-4 md:mb-4 lg:mt-5 lg:mb-5 font-semibold w-full  text-grey-950 text-base sm:text-xl md:text[24px] lg:text-[26px]'
				>
					{children}
				</h6>
			),
			normal: ({ children }) => (
				<p className='mt-2 mb-2 sm:mt-3 sm:mb-3 md:mt-4 md:mb-4 lg:mt-5 lg:mb-5 text-grey-950 font-light text-body'>
					{children}
				</p>
			)
		},
		types: {
			image: ({ value }) => {
				return (
					<div className='relative w-full '>
						<figure>
							<Image
								className={`w-full object-contain `}
								alt={value?.alt || ''}
								src={urlForImage(value)?.url() as string}
								priority={true}
								quality={100}
								width={800}
								height={450}
								// fill
							/>
							{value.caption && (
								<figcaption className='text-center text-sm font-light'>{value.caption}</figcaption>
							)}
						</figure>
					</div>
				)
			},
			code: ({ value }) => {
				const lang = value.language || 'javascript'
				return (
					<pre className={`language-${lang} !bg-gray-900 text-white p-4 rounded-md overflow-auto my-4`}>
						<code className={`language-${lang}`}>{value.code}</code>
					</pre>
				)
			},
			table: ({ value }: { value: TableValue }) => {
				if (!value || !value.rows) return null

				return (
					<table className='border-collapse border border-grey-950 w-full'>
						<tbody>
							{value.rows.map((row, idx) => (
								<tr key={row._key}>
									{row.cells.map((cell, index) => (
										<td
											key={index}
											className={`border border-grey-950 p-2 text-grey-950 ${idx === 0 ? 'font-semibold' : 'font-light'} text-base`}
										>
											{cell}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				)
			}
		},
		marks: {
			strong: ({ children }) => <strong className='font-bold'>{children}</strong>,
			span: ({ children }) => <span className='text-grey-950'>{children}</span>,
			em: ({ children }) => <em className='italic'>{children}</em>,
			link: ({ children, value }) => {
				return (
					<a
						href={value?.href}
						rel='noreferrer noopener'
						className='w-full text-infinity-blue font-medium no-underline hover:underline'
					>
						{children}
					</a>
				)
			}
		},
		listItem: {
			bullet: ({ children }) => <li className='pl-0 ps-0 pe-0 font-light text-grey-950'> {children}</li>,
			number: ({ children }) => <li className='pl-0 !ps-0 !pe-0 font-light text-grey-950'> {children}</li>,
			checkmarks: ({ children }) => <li className='pl-0 !ps-0 !pe-0 font-light text-grey-950'> {children}</li>
		}
	}

	return (
		<div className={['prose', className].filter(Boolean).join(' ')} style={{ width: '100%' }}>
			<PortableText components={components} value={value} />
		</div>
	)
}
