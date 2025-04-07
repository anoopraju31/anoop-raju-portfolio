'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import useFooterScrollOverViewport from '@/app/(portfolio)/hooks/useFooterScrollOverViewport'
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector'
import { useDispatch } from 'react-redux'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Gantari } from 'next/font/google'
import Link from 'next/link'
import { CgClose, CgMenu } from 'react-icons/cg'
// import MagneticContainer from '../MagneticContainer'
import NavMenu from './navMenu/NavMenu'
import { slideToView } from '@/utills/animations'
import { closeMenu, toggleMenu } from '@/app/(portfolio)/features/navbarSlice'

const gantari = Gantari({ weight: '400', subsets: ['latin'] })

const Header = () => {
	const [showHeader, setShowHeader] = useState<boolean>(true)
	const isMenuOpen = useAppSelector((state) => state.navbar.isMenuOpen)
	const dispatch = useDispatch()
	const isHeaderColorDark = useFooterScrollOverViewport()
	const pathname = usePathname()
	const { scrollY } = useScroll()
	const scrollHeight = useRef<number>(0)

	useMotionValueEvent(scrollY, 'change', (latest) => {
		setShowHeader(scrollHeight.current > latest)
		scrollHeight.current = latest
	})

	useEffect(() => {
		dispatch(closeMenu())
	}, [pathname, dispatch])

	const handleMenuButtonClick = () => dispatch(toggleMenu())
	const handleClose = () => dispatch(closeMenu())

	const menuStyle = () => {
		if (!isMenuOpen && !isHeaderColorDark)
			return 'bg-white hover:bg-light-green border-white hover:border-light-green text-dark-blue hover:text-dark-blue'
		if (!isMenuOpen && isHeaderColorDark)
			return 'bg-white hover:bg-light-green border-white hover:border-light-green text-dark-blue hover:text-dark-blue'
		if (isMenuOpen && !isHeaderColorDark)
			return 'bg-dark-blue hover:bg-transparent border-dark-blue hover:border-dark-blue text-light-green hover:text-dark-blue'
		else return 'bg-light-green hover:bg-transparent border-light-green text-dark-blue hover:text-light-green'
	}

	const logoStyle = () => {
		if (!isMenuOpen && !isHeaderColorDark) return 'text-white hover:text-light-green'
		if (!isMenuOpen && isHeaderColorDark) return 'text-white hover:text-dark-blue'
		if (isMenuOpen && !isHeaderColorDark) return 'text-dark-blue hover:text-dark-blue'
		else return 'text-light-green hover:text-light-green'
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
					showHeader || isMenuOpen ? 'top-0' : '-top-40'
				} left-0 right-0 cursor-none z-[100] w-full max-w-[1400px] mx-auto mt-5 py-2 px-[25px] flex justify-between items-center transition-top duration-1000 ease-in-out`}
			>
				<Link
					aria-label='logo'
					href='/'
					onClick={handleClose}
					className={`uppercase ${logoStyle()} drop-shadow-lg cursor-none transition-colors duration-1000 text-2xl md:text-3xl outline-none ${gantari.className}`}
				>
					Anoopfolio
				</Link>

				{/* <MagneticContainer> */}
				<button
					type='button'
					onClick={handleMenuButtonClick}
					className={`rounded-lg text-xl md:text-2xl p-1.5 md:p-2 flex justify-center items-center border-2 ${menuStyle()} cursor-none transition-colors duration-1000`}
				>
					<span className='sr-only'> Menu </span>
					{isMenuOpen ? <CgClose /> : <CgMenu />}
				</button>
				{/* </MagneticContainer> */}
			</motion.header>

			<AnimatePresence mode='wait'>{isMenuOpen && <NavMenu />}</AnimatePresence>
		</>
	)
}

export default Header
