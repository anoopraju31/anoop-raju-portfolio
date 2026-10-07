'use client'

import { FiArrowUpRight } from 'react-icons/fi'

type FooterLinkProps = {
	title: string
	link: string
	index?: number
	isHovered?: boolean
	isAnyHovered?: boolean
	onHoverStart?: () => void
	onHoverEnd?: () => void
}

const FooterLink = ({
	title,
	link,
	index,
	isHovered,
	isAnyHovered,
	onHoverStart,
	onHoverEnd
}: FooterLinkProps) => {
	const formattedIndex = index !== undefined ? (index + 1).toString().padStart(2, '0') : ''

	return (
		<li className='relative group'>
			<a
				target='_blank'
				rel='noopener noreferrer'
				href={link}
				onMouseEnter={onHoverStart}
				onMouseLeave={onHoverEnd}
				className={`flex items-center justify-between py-3 sm:py-4 transition-all duration-300 cursor-none select-none ${
					isAnyHovered && !isHovered ? 'opacity-35' : 'opacity-100'
				}`}
			>
				<div className='flex items-baseline gap-3 sm:gap-6 transform transition-transform duration-300 ease-out group-hover:translate-x-2 sm:group-hover:translate-x-4'>
					{formattedIndex && (
						<span className='font-mono text-xs sm:text-sm font-semibold text-dark-blue/50 group-hover:text-dark-blue transition-colors'>
							{formattedIndex}
						</span>
					)}
					<span className='text-xl sm:text-3xl lg:text-4xl xl:text-5xl uppercase font-bold tracking-tight text-dark-blue'>
						{title}
					</span>
				</div>

				<div className='flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-dark-blue/20 group-hover:border-dark-blue group-hover:bg-dark-blue group-hover:text-light-green transition-all duration-300 transform group-hover:rotate-45'>
					<FiArrowUpRight className='text-lg sm:text-2xl transition-transform duration-300' />
				</div>
			</a>
			<div className='h-[1.5px] bg-dark-blue/25 group-hover:bg-dark-blue transition-colors duration-300' />
		</li>
	)
}

export default FooterLink
