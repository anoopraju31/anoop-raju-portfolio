'use client'

import { type FC } from 'react'
import useAppDispatch from '@/app/hooks/useAddDispatch'
import { mouseEnter, mouseLeave } from '@/app/features/textHoverSlice'

type Props = {
	skill: string
}

const SkillItemMask: FC<Props> = ({ skill }) => {
	const dispatch = useAppDispatch()

	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())

	return (
		<p
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className='text-skill leading-none font-extrabold'>
			{skill}
		</p>
	)
}

export default SkillItemMask
