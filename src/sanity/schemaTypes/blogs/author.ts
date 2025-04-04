import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const authorType = defineType({
	name: 'author',
	title: 'Author',
	icon: UserIcon,
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'shortDescription',
			title: 'Short Description',
			description: 'Practicing Psychologist | EAP Counsellor | Content Writer',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'picture',
			title: 'Picture',
			type: 'image',
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
			options: {
				hotspot: true
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'socialLinks',
			title: 'Social Links',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'platform',
							title: 'Platform',
							type: 'string',
							options: {
								list: [
									{ title: 'Twitter', value: 'twitter' },
									{ title: 'LinkedIn', value: 'linkedin' },
									{ title: 'Instagram', value: 'instagram' },
									{ title: 'YouTube', value: 'youtube' },
									{ title: 'Facebook', value: 'facebook' }
								]
							},
							validation: (Rule) => Rule.required()
						},
						{
							name: 'url',
							title: 'URL',
							type: 'url',
							validation: (Rule) =>
								Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }).error(
									'Please enter a valid URL'
								)
						}
					]
				}
			]
		})
	]
})
