'use client'
import { type FC, Ref, useEffect, useState } from 'react'
import useFooterScrollOverViewport from '@/app/hooks/useFooterScrollOverViewport'
import { useMouse } from '@uidotdev/usehooks'
import { motion } from 'framer-motion'
import Curve from '../Curve'
import NavLink from './NavLink'
import { menuSlide } from '@/utills/animations'

const NavMenu: FC = () => {
	const [hover, setHover] = useState(false)
	const [mouse, ref] = useMouse()
	const isBackgroundDark = useFooterScrollOverViewport()
	const { elementX, elementY } = mouse

	useEffect(() => {
		const container = ref.current
		if (!container) return

		const handleMouseEnter = () => setHover(true)
		const handleMouseLeave = () => setHover(false)

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
			className={`fixed top-0 left-0 right-0 z-50 h-screen ${
				isBackgroundDark ? 'bg-dark-blue' : 'bg-light-green'
			} flex justify-center items-center cursor-none'`}
			variants={menuSlide}
			initial='initial'
			animate='enter'
			exit='exit'>
			{hover && (
				<motion.div
					className={`w-32 h-32 ${
						isBackgroundDark ? 'bg-light-green' : 'bg-dark-blue'
					} rounded-full flex justify-center items-center z-50 absolute`}
					animate={{
						height: 20,
						width: 20,
						fontSize: '18px',
						x: elementX - window.innerWidth / 2,
						y: elementY - window.innerHeight / 2,
					}}
					transition={{ type: 'tween', ease: 'backOut', duration: 0.01 }}
				/>
			)}
			<nav
				className={`flex flex-col justify-center items-center ${
					isBackgroundDark ? 'text-light-green' : 'text-dark-blue'
				}`}>
				<NavLink title='Home' link='/' />
				<NavLink
					title={isBackgroundDark ? 'Projects dark' : 'Projects'}
					link='/projects'
				/>
				<NavLink title='Contact' link='/contact' />
				<NavLink title='Blogs' link='/blogs' />
			</nav>
			<Curve isBackgroundDark={isBackgroundDark} />
		</motion.div>
	)
}

export default NavMenu
