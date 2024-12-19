import { type FC } from 'react'

type Props = {
	id: string
	content: string
}

const ContactWrapper: FC<Props> = ({ id, content }) => {
	return (
		<div id={id} className='flex items-center gap-5'>
			<div className='w-[22px] h-[1px] bg-white' />
			<p className='text-[20px] font-light'> {content} </p>
		</div>
	)
}

export default ContactWrapper
