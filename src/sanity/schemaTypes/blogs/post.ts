import { DocumentTextIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import { authorType } from './author'
import { tagType } from './tags'

export const postType = defineType({
	name: 'post',
	title: 'Post',
	icon: DocumentTextIcon,
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description: 'It for Url Navigation and SEO  ex. blog-1 than url is blogs.infigon.in/blog-1',
			options: {
				source: 'title',
				maxLength: 96,
				isUnique: (value, context) => context.defaultIsUnique(value, context)
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'content',
			title: 'Content',
			type: 'array',
			description: 'This is the main Content of Blog (Formatting is preserved)',
			of: [
				{ type: 'block' }, // Standard text block
				{
					type: 'code',
					title: 'Code Block',
					options: {
						language: 'javascript', // Default language
						languageAlternatives: [
							{ title: 'JavaScript', value: 'javascript' },
							{ title: 'TypeScript', value: 'typescript' },
							{ title: 'HTML', value: 'html' },
							{ title: 'CSS', value: 'css' },
							{ title: 'Python', value: 'python' }
						]
					}
				},
				{
					type: 'image',
					options: { hotspot: true },
					fields: [
						{
							name: 'alt',
							title: 'Alternative Text',
							type: 'string',
							options: { isHighlighted: true },
							validation: (Rule) =>
								Rule.required().error('Alternative text is required for accessibility.')
						},
						{
							name: 'caption',
							title: 'Caption',
							type: 'string',
							options: { isHighlighted: true }
						}
					]
				},
				{
					name: 'table',
					type: 'table'
				}
			],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'conclusion',
			title: 'Conclusion',
			type: 'array',
			description:
				'(Optional) This is the conclusion of Blog (Formatting is preserved & do not add heading - Conclusion) ',
			of: [{ type: 'block' }]
		}),
		defineField({
			name: 'readTime',
			type: 'number',
			title: 'Read Time (in minutes)',
			description: 'Estimated time to read the blog post in minutes',
			validation: (Rule) => Rule.positive().integer().min(1).max(1440) // Example limits: 1 minute to 24 hours
		}),

		defineField({
			name: 'coverImage',
			title: 'Cover Image',
			type: 'image',
			options: {
				hotspot: true
			},
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alternative text',
					description: 'Important for SEO and accessiblity.',
					validation: (rule) => {
						return rule.custom((alt, context) => {
							const document = context.document as { picture?: { asset?: { _ref?: string } } }
							if (document.picture?.asset?._ref && !alt) {
								return 'Required'
							}
							return true
						})
					}
				}
			],
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'date',
			title: 'Date',
			type: 'datetime',
			initialValue: () => new Date().toISOString()
		}),
		defineField({
			name: 'author',
			title: 'Author',
			description: 'Want to add other author : Go to Author Section and add new author',
			type: 'reference',
			to: [{ type: authorType.name }]
		}),

		defineField({
			name: 'keywords',
			title: 'Keywords',
			type: 'array',
			of: [{ type: 'string' }]
		}),
		defineField({
			name: 'seoTitle',
			title: 'SEO Title',
			type: 'string',
			validation: (Rule) => Rule.max(60).warning('Keep the SEO title under 60 characters.')
		}),
		defineField({
			name: 'seoDescription',
			title: 'SEO Description',
			type: 'text',
			validation: (Rule) => Rule.max(160).warning('Keep the SEO description under 160 characters.')
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'reference', to: { type: tagType.name } }]
		})
	],
	preview: {
		select: {
			title: 'title',
			author: 'author.name',
			date: 'date',
			media: 'coverImage'
		},
		prepare({ title, media, author, date }) {
			const subtitles = [author && `by ${author}`, date && `on ${format(parseISO(date), 'LLL d, yyyy')}`].filter(
				Boolean
			)

			return { title, media, subtitle: subtitles.join(' ') }
		}
	}
})
