import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'projects',
	title: 'Projects',
	type: 'document',
	fields: [
		defineField({
			name: 'projectName',
			title: 'Project Name',
			type: 'string',
			validation: (Rule) => Rule.required().error('Project name is required')
		}),
		defineField({
			name: 'projectDescription',
			title: 'Project Description',
			type: 'text'
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published At',
			type: 'datetime',
			validation: (Rule) => Rule.required().error('Published date is required')
		}),
		defineField({
			name: 'projectImage',
			title: 'Project Image',
			type: 'image',
			fields: [
				{
					name: 'alt',
					title: 'Alternative text',
					type: 'string',
					description: 'Important for SEO and accessibility.',
					validation: (rule) =>
						rule.custom((alt, context) => {
							const document = context.document as { projectImage?: { asset?: { _ref?: string } } }

							return document.projectImage?.asset?._ref && !alt
								? 'Alternative text is required when an image is added.'
								: true
						})
				}
			],
			options: {
				hotspot: true
			},
			validation: (rule) => rule.required().error('Project Image is required')
		}),
		defineField({
			name: 'deploymentUrl',
			title: 'Deployment URL',
			type: 'url',
			validation: (Rule) => Rule.required().error('Deployment URL is required')
		}),
		defineField({
			name: 'projectGithubUrl',
			title: 'Project Github URL',
			type: 'url',
			validation: (Rule) => Rule.required().error('Github URL is required')
		}),
		defineField({
			name: 'techStack',
			title: 'Tech Stack',
			type: 'array',
			of: [{ type: 'string' }],
			validation: (Rule) => Rule.min(1).required().error('At least one technology is required in the tech stack')
		}),
		defineField({
			name: 'isFeatured',
			title: 'Is Featured',
			type: 'boolean',
			initialValue: false // Default value set to false
		})
	]
})
