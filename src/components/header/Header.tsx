'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Gantari } from 'next/font/google'
import { AnimatePresence, motion } from 'framer-motion'
import { CgClose, CgMenu } from 'react-icons/cg'
import NavMenu from './NavMenu'
import { slideToView } from '@/utills/animations'

const gantari = Gantari({ weight: '400', subsets: ['latin'] })

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
	const pathname = usePathname()
	const toggleMenu = () => setIsMenuOpen((prev) => !prev)

	useEffect(() => {
		setIsMenuOpen(false)
	}, [pathname])

	return (
		<>
			<motion.h2
				variants={slideToView}
				initial='initial'
				whileInView='animate'
				viewport={{ once: true }}
				transition={{ delay: 0.5 }}
				className='fixed top-0 left-0 right-0 z-50 w-full max-w-[1400px] mx-auto mt-5 py-2 px-[10px] md:px-[25px] flex justify-between items-center'>
				<Link
					aria-label='logo'
					href='/'
					className={`uppercase ${
						isMenuOpen ? 'text-black' : 'text-white'
					} transition-colors duration-1000 delay-500 text-2xl md:text-3xl ${
						gantari.className
					}`}>
					Anoopfolio
				</Link>

				<button
					type='button'
					onClick={toggleMenu}
					className={`rounded-3xl text-xl md:text-2xl p-1 md:p-2 flex justify-center items-center ${
						isMenuOpen ? 'bg-black text-light-green' : 'bg-white text-black'
					} transition-colors duration-1000 delay-500`}>
					<span className='sr-only'> Menu </span>
					{isMenuOpen ? <CgClose /> : <CgMenu />}
				</button>
			</motion.h2>

			<AnimatePresence mode='wait'>{isMenuOpen && <NavMenu />}</AnimatePresence>
		</>
	)
}

export default Header
