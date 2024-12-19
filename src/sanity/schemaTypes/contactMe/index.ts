import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'contactMe',
	title: 'Contact Me',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			type: 'string',
			title: 'Name',
			validation: (Rule) => Rule.required().min(2).max(50).error('Name must be between 2 and 50 characters.')
		}),
		defineField({
			name: 'email',
			type: 'string',
			title: 'Email',
			validation: (Rule) => Rule.required().email().error('Please enter a valid email address.')
		}),
		defineField({
			name: 'subject',
			type: 'string',
			title: 'Subject',
			validation: (Rule) => Rule.required().min(2).max(100).error('Subject must be between 2 and 50 characters.')
		}),
		defineField({
			name: 'message',
			type: 'string',
			title: 'Message',
			validation: (Rule) =>
				Rule.required().min(10).max(500).error('Message must be between 10 and 500 characters.')
		}),
		defineField({
			name: 'submittedAt',
			title: 'Submitted At',
			type: 'datetime',
			initialValue: () => new Date().toISOString(),
			readOnly: true
		})
	]
})
