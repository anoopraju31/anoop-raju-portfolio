'use client'

import { useState, type FC, type ReactNode } from 'react'
import { FiCopy, FiCheck, FiArrowUpRight } from 'react-icons/fi'
import { toast } from 'sonner'

type Props = {
	id?: string
	label: string
	content: string
	href?: string
	icon?: ReactNode
	copyable?: boolean
}

const ContactWrapper: FC<Props> = ({
	id,
	label,
	content,
	href,
	icon,
	copyable
}) => {
	const [copied, setCopied] = useState(false)

	const handleCopy = (e: React.MouseEvent) => {
		e.preventDefault()
		navigator.clipboard.writeText(content)
		setCopied(true)
		toast.success(`${label} copied to clipboard!`)
		setTimeout(() => setCopied(false), 2000)
	}

	const contentNode = (
		<div className='flex items-center justify-between w-full'>
			<div className='flex items-center gap-4 sm:gap-5'>
				{icon && (
					<div className='flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/[0.04] border border-white/10 text-light-green text-lg sm:text-xl group-hover:border-light-green/40 group-hover:bg-light-green/10 transition-colors'>
						{icon}
					</div>
				)}
				<div>
					<span className='block text-xs font-mono uppercase tracking-widest text-white/40 mb-0.5'>
						{label}
					</span>
					<p className='text-base sm:text-lg font-medium text-white group-hover:text-light-green transition-colors'>
						{content}
					</p>
				</div>
			</div>

			<div className='flex items-center gap-2'>
				{copyable && (
					<button
						type='button'
						onClick={handleCopy}
						title={`Copy ${label}`}
						className='p-2 rounded-lg text-white/50 hover:text-light-green hover:bg-white/10 transition-colors'
					>
						{copied ? <FiCheck className='text-light-green' /> : <FiCopy />}
					</button>
				)}

				{href && (
					<span className='p-2 text-white/40 group-hover:text-light-green transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'>
						<FiArrowUpRight className='text-lg' />
					</span>
				)}
			</div>
		</div>
	)

	return (
		<div
			id={id}
			className='w-full p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-light-green/30 hover:bg-white/[0.04] transition-all duration-300 group'
		>
			{href ? (
				<a
					href={href}
					target={href.startsWith('http') ? '_blank' : undefined}
					rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
					className='block w-full'
				>
					{contentNode}
				</a>
			) : (
				contentNode
			)}
		</div>
	)
}

export default ContactWrapper
