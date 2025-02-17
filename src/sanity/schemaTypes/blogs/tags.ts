import { defineField, defineType } from 'sanity'

export const tagType = defineType({
	name: 'tags',
	title: 'Tags',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required().error('You must enter a title'),
			description: 'The title of the tag'
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96
			}
		}),
		defineField({
			name: 'meta_description',
			title: 'Meta description',
			type: 'text',
			description: 'A short description of the tag'
		})
	]
})
