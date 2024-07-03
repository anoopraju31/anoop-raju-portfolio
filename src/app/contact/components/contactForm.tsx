import type { FC } from 'react'
import InputField from './inputField'
import TextareaField from './textareaField'

const ContactForm: FC = () => {
	return (
		<form className='flex flex-col items-end gap-7 self-stretch'>
			<div className='flex flex-col items-start gap-[60px] self-stretch'>
				<InputField
					form='Your name'
					htmlFor='name'
					type='text'
					id='name'
					name='name'
				/>

				<InputField
					form='Your email'
					htmlFor='email'
					type='email'
					id='email'
					name='email'
				/>

				<InputField
					form='Your budget'
					htmlFor='budget'
					type='text'
					id='budget'
					name='budget'
				/>

				<TextareaField
					form='Your message'
					htmlFor='message'
					id='message'
					name='message'
					rows={1}
				/>
			</div>

			<button className='flex py-4 px-10 justify-center border-none outline-none items-center gap-5 bg-dark-blue dark:bg-white text-white dark:text-dark-blue hover:bg-light-green hover:text-dark-blue hover:dark:bg-light-green hover:dark:text-dark-blue transition-colors duration-300'>
				Send
			</button>
		</form>
	)
}

export default ContactForm
