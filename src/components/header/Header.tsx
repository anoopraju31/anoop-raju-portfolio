'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Gantari } from 'next/font/google'
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from 'framer-motion'
import { CgClose, CgMenu } from 'react-icons/cg'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import NavMenu from './navMenu/NavMenu'
import { slideToView } from '@/utills/animations'
import MagneticContainer from '../MagneticContainer'

const gantari = Gantari({ weight: '400', subsets: ['latin'] })

const Header = () => {
	const [showHeader, setShowHeader] = useState<boolean>(true)
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
	const [isHeaderColorDark, setIsHeaderColorDark] = useState<boolean>(false)
	const [hover, setHover] = useState(false)
	const pathname = usePathname()
	const { scrollY } = useScroll()
	const scrollHeight = useRef<number>(0)

	const toggleMenu = () => setIsMenuOpen((prev) => !prev)
	const handleMouseEnter = () => setHover(true)
	const handleMouseLeave = () => setHover(false)

	useMotionValueEvent(scrollY, 'change', (latest) => {
		setShowHeader(scrollHeight.current > latest)
		scrollHeight.current = latest
	})

	useEffect(() => {
		const footer = document.getElementById('footer')
		const handleHeaderColorChangeOnScroll = () => {
			if (footer) {
				const footerRect = footer.getBoundingClientRect()

				setIsHeaderColorDark(footerRect.top <= 74)
			}
		}

		document.addEventListener('scroll', handleHeaderColorChangeOnScroll)

		return () =>
			document.removeEventListener('scroll', handleHeaderColorChangeOnScroll)
	}, [])

	useEffect(() => {
		setIsMenuOpen(false)
	}, [pathname])

	const menuStyle = () => {
		if (isMenuOpen && hover) return 'text-light-green border-none bg-black'
		if (isHeaderColorDark && hover) return 'bg-black border-none text-white'
		if (!isHeaderColorDark && hover)
			return 'text-black border-none bg-light-green'

		if (isHeaderColorDark) return 'bg-black border-none text-light-green'
		if (isMenuOpen) return 'text-black border border-black'
		return 'text-white border border-white'
	}

	return (
		<>
			<motion.header
				variants={slideToView}
				initial='initial'
				whileInView='animate'
				viewport={{ once: true }}
				transition={{ delay: 0.5 }}
				className={`fixed ${
					showHeader ? 'top-0' : '-top-40'
				} left-0 right-0 z-[100] w-full max-w-[1400px] mx-auto mt-5 py-2 px-[10px] md:px-[25px] flex justify-between items-center transition-top duration-1000 ease-in-out`}>
				<Link
					aria-label='logo'
					href='/'
					onClick={() => setIsMenuOpen(false)}
					className={`uppercase ${
						isMenuOpen
							? 'text-black delay-500'
							: isHeaderColorDark
							? 'text-dark-blue hover:text-white'
							: 'text-white hover:text-light-green'
					} transition-colors duration-500 text-2xl md:text-3xl outline-none ${
						gantari.className
					}`}>
					Anoopfolio
				</Link>

				<MagneticContainer>
					<button
						type='button'
						onClick={toggleMenu}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={`rounded-3xl text-xl md:text-2xl p-1.5 md:p-2 flex justify-center items-center ${menuStyle()} transition-colors duration-500`}>
						<span className='sr-only'> Menu </span>
						{isMenuOpen ? <CgClose /> : <CgMenu />}
					</button>
				</MagneticContainer>
			</motion.header>

			<AnimatePresence mode='wait'>{isMenuOpen && <NavMenu />}</AnimatePresence>
		</>
	)
}

export default Header
