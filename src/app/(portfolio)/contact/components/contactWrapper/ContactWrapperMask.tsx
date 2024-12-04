'use Client'

import { type FC } from 'react'
import { mouseEnter, mouseLeave } from '@/app/(portfolio)/features/textHoverSlice'
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch'

type Props = {
	id: string
	content: string
}

const ContactWrapper: FC<Props> = ({ id, content }) => {
	const dispatch = useAppDispatch()

	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())
	return (
		<div id={id} className='flex items-center gap-5 text-dark-blue'>
			<div className='w-[22px] h-[1px] bg-dark-blue' />
			<p className='text-[20px] font-light'> {content} </p>
		</div>
	)
}

export default ContactWrapper
