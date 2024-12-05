import { formatDate } from '@/utills'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'post',
	title: 'Post',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required().error('Title is required')
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
				isUnique: (value, context) => context.defaultIsUnique(value, context)
			},
			validation: (Rule) => Rule.required().error('Slug is required')
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published At',
			type: 'datetime',
			initialValue: () => new Date().toISOString(),
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'updatedAt',
			title: 'Updated At',
			type: 'datetime'
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: [{ type: 'author' }],
			validation: (Rule) => Rule.required().error('Author is required')
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'reference',
			to: [{ type: 'tags' }],
			validation: (Rule) => Rule.required().error('Tags are required')
		}),
		defineField({
			name: 'coverImage',
			title: 'Cover Image',
			type: 'image',
			fields: [
				{
					name: 'alt',
					title: 'Alternative text',
					type: 'string',
					description: 'Important for SEO and accessibility.',
					validation: (rule) =>
						rule.custom((alt, context) => {
							const document = context.document as { coverImage?: { asset?: { _ref?: string } } }

							return document.coverImage?.asset?._ref && !alt
								? 'Alternative text is required when an image is added.'
								: true
						})
				}
			],
			options: {
				hotspot: true
			},
			validation: (rule) => rule.required().error('Cover image is required')
		}),
		defineField({
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			validation: (Rule) => Rule.required().error('Excerpt is required')
		})
		// defineField({
		// 	name: 'content',
		// 	title: 'Content',
		// 	type: 'reference',
		// 	to: [{ type: 'blockContent' }],
		// 	validation: (Rule) => Rule.required().error('Content is required')
		// })
	],
	preview: {
		select: {
			title: 'title',
			author: 'author.name',
			date: 'publishedAt',
			media: 'coverImage'
		},
		prepare({ title, author, date, media }) {
			const subtitles = [author && `by ${author}`, date && `on ${formatDate(date)}`].filter(Boolean)

			return { title, media, subtitle: subtitles.join(' ') }
		}
	}
})
