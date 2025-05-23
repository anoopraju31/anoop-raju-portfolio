import React, { FC, TextareaHTMLAttributes } from 'react'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

const TextareaField: FC<Props> = ({ ...rest }) => {
	return (
		<div className='flex-1 w-full relative z-0'>
			<textarea
				placeholder={rest.placeholder || ' '}
				className='block py-2.5 px-0 w-full text-sm text-dark-blue bg-transparent border-0 border-b-2 border-dark-blue appearance-none dark:text-white dark:border-white dark:focus:border-light-green focus:outline-none focus:ring-0 focus:border-light-green peer'
				rows={rest.rows || 1}
				{...rest}
			/>
			<label
				htmlFor={rest.id}
				className='absolute text-base text-dark-blue dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-light-green peer-focus:dark:text-light-green peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
			>
				{rest.form}
			</label>
		</div>
	)
}

export default TextareaField
