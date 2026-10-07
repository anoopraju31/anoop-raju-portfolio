import type { FC, TextareaHTMLAttributes } from 'react'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	form?: string
	label?: string
}

const TextareaField: FC<Props> = ({ form, label, id, className, rows = 3, ...rest }) => {
	const displayLabel = label || form

	return (
		<div className='w-full relative z-0 group'>
			<textarea
				id={id}
				placeholder=' '
				rows={rows}
				className={`block py-3 px-0 w-full text-base sm:text-lg text-white bg-transparent border-0 border-b-2 border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-light-green peer resize-none transition-colors duration-300 ${className || ''}`}
				{...rest}
			/>
			{displayLabel && (
				<label
					htmlFor={id}
					className='absolute text-sm sm:text-base text-white/50 duration-300 transform -translate-y-6 scale-75 top-3.5 origin-[0] pointer-events-none peer-focus:start-0 peer-focus:text-light-green peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-mono tracking-wider uppercase'
				>
					{displayLabel}
				</label>
			)}
		</div>
	)
}

export default TextareaField
