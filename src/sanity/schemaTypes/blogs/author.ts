import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export default defineType({
	name: 'author',
	title: 'Author',
	icon: UserIcon,
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'picture',
			title: 'Picture',
			type: 'image',
			fields: [
				{
					name: 'alt',
					title: 'Alternative text',
					type: 'string',
					description: 'Important for SEO and accessibility.',
					validation: (rule) =>
						rule.custom((alt, context) => {
							const document = context.document as { picture?: { asset?: { _ref?: string } } }

							return document.picture?.asset?._ref && !alt ? 'Required' : true
						})
				}
			],
			options: {
				hotspot: true
			},
			validation: (rule) => rule.required()
		})
	]
})
