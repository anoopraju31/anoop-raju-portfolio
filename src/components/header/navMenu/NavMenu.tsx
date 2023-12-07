import { motion } from 'framer-motion'
import { menuSlide } from '@/utills/animations'
import Curve from '../Curve'
import NavLink from './NavLink'
import { useMouse } from '@uidotdev/usehooks'
import { Ref, useEffect, useState } from 'react'

const NavMenu = () => {
	const [hover, setHover] = useState(false)
	const [mouse, ref] = useMouse()
	const { elementX, elementY, x, y } = mouse

	const handleMouseEnter = () => setHover(true)
	const handleMouseLeave = () => setHover(false)

	useEffect(() => {
		const container = ref.current
		if (!container) return

		container.addEventListener('mouseenter', handleMouseEnter)
		container.addEventListener('mouseleave ', handleMouseLeave)

		return () => {
			container.removeEventListener('mouseenter', handleMouseEnter)
			container.removeEventListener('mouseleave ', handleMouseLeave)
		}
	}, [ref])

	return (
		<motion.div
			ref={ref as Ref<HTMLDivElement> | undefined}
			className='fixed top-0 left-0 right-0 z-40 h-screen bg-light-green flex justify-center items-center cursor-none'
			variants={menuSlide}
			initial='initial'
			animate='enter'
			exit='exit'>
			{hover && (
				<motion.div
					className='w-32 h-32 bg-black rounded-full flex justify-center items-center z-50 absolute'
					animate={{
						height: 20,
						width: 20,
						background: '#000',
						fontSize: '18px',
						x: elementX - window.innerWidth / 2,
						y: elementY - window.innerHeight / 2,
					}}
					transition={{ type: 'tween', ease: 'backOut', duration: 0.01 }}
				/>
			)}
			<nav className='flex flex-col justify-center items-center text-black'>
				<NavLink title='Home' link='/' />
				<NavLink title='Projects' link='/projects' />
				<NavLink title='Contact' link='/contact' />
			</nav>
			<Curve />
		</motion.div>
	)
}

export default NavMenu
