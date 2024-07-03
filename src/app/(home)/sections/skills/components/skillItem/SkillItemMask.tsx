'use client'
import { mouseEnter, mouseLeave } from '@/app/features/textHoverSlice'
import useAppDispatch from '@/app/hooks/useAddDispatch'

type Props = {
	skill: string
}

const SkillItemMask = (props: Props) => {
	const { skill } = props
	const dispatch = useAppDispatch()

	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())
	return (
		<p
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className='text-3xl xl:text-8xl font-extrabold '>
			{skill}
		</p>
	)
}
export default SkillItemMask
