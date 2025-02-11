'use client'

import { type ChangeEvent, useState, type FC, FormEvent, useEffect } from 'react'
import InputField from './inputField'
import TextareaField from './textareaField'
import { submitContactMe } from '@/utills/actions'
import { toast } from 'sonner'

export type ContactFormData = {
	name: string
	email: string
	subject: string
	message: string
}

const initialFormData: ContactFormData = {
	name: '',
	email: '',
	subject: '',
	message: ''
}

type Status = 'DISABLED' | 'SUBMITTING' | 'SUCCESS' | 'ERROR' | 'ENABLED'

const ContactForm: FC = () => {
	const [formData, setFormData] = useState<ContactFormData>(initialFormData)
	const [status, setStatus] = useState<Status>('DISABLED')

	useEffect(() => {
		const { email, name, subject, message } = formData
		const isDisabled = !email || !name || !subject || !message

		setStatus(isDisabled ? 'DISABLED' : 'ENABLED')
	}, [formData])

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const response = await submitContactMe(formData)

		if (!response) {
			toast.error('Something went wrong. Please try again later.')
			return
		}

		setStatus('SUCCESS')
		setFormData(initialFormData)
		toast.success('Message sent successfully!')
	}

	return (
		<form onSubmit={handleSubmit} className='flex flex-col items-end gap-6 md:gap-8 self-stretch'>
			<div className='flex flex-col items-start gap-4 sm:gap-5 md:gap-8 lg:gap-12 xl:gap-[60px] self-stretch'>
				{/* Name */}
				<InputField
					form='Your name'
					type='text'
					id='name'
					name='name'
					value={formData.name}
					onChange={handleChange}
				/>

				{/* Email */}
				<InputField
					form='Your email'
					type='email'
					id='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
				/>

				{/* Subject */}
				<InputField
					form='Your Subject'
					type='text'
					id='subject'
					name='subject'
					value={formData.subject}
					onChange={handleChange}
				/>

				{/* Message */}
				<TextareaField
					form='Your message'
					id='message'
					name='message'
					rows={1}
					value={formData.message}
					onChange={handleChange}
				/>
			</div>

			<button
				type='submit'
				disabled={status === 'DISABLED'}
				className='flex py-4 px-10 justify-center border-none outline-none items-center gap-5 cursor-pointer disabled:cursor-not-allowed bg-dark-blue dark:bg-white text-white dark:text-dark-blue hover:bg-light-green hover:text-dark-blue hover:dark:bg-light-green hover:dark:text-dark-blue transition-colors duration-300'
			>
				Send
			</button>
		</form>
	)
}

export default ContactForm
