'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Gantari } from 'next/font/google'
import { AnimatePresence, motion } from 'framer-motion'
import { CgClose, CgMenu } from 'react-icons/cg'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import NavMenu from './navMenu/NavMenu'
import { slideToView } from '@/utills/animations'
import MagneticContainer from '../MagneticContainer'

const gantari = Gantari({ weight: '400', subsets: ['latin'] })

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
	const [hover, setHover] = useState(false)
	const pathname = usePathname()

	const toggleMenu = () => setIsMenuOpen((prev) => !prev)
	const handleMouseEnter = () => setHover(true)
	const handleMouseLeave = () => setHover(false)

	useEffect(() => {
		setIsMenuOpen(false)
	}, [pathname])

	const menuStyle = () => {
		if (isMenuOpen && hover) return 'text-light-green border-none bg-black'
		if (hover) return 'text-black border-none bg-light-green'
		if (isMenuOpen) return 'text-black border border-black'
		return 'text-white border border-white'
	}

	return (
		<>
			<motion.h2
				variants={slideToView}
				initial='initial'
				whileInView='animate'
				viewport={{ once: true }}
				transition={{ delay: 0.5 }}
				className='fixed top-0 left-0 right-0 z-[100] w-full max-w-[1400px] mx-auto mt-5 py-2 px-[10px] md:px-[25px] flex justify-between items-center'>
				<Link
					aria-label='logo'
					href='/'
					className={`uppercase ${
						isMenuOpen
							? 'text-black delay-500'
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
			</motion.h2>

			<AnimatePresence mode='wait'>{isMenuOpen && <NavMenu />}</AnimatePresence>
		</>
	)
}

export default Header
