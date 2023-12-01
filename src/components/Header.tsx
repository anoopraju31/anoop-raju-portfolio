'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Gantari } from 'next/font/google'
import { CgClose, CgMenu } from 'react-icons/cg'
import NavMenu from './NavMenu'

const gantari = Gantari({ weight: '400', subsets: ['latin'] })

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
	const toggleMenu = () => setIsMenuOpen((prev) => !prev)

	return (
		<>
			<header className='fixed top-0 left-0 right-0 z-50 w-full max-w-[1400px] mx-auto mt-5 px-[10px] md:px-[25px] flex justify-between items-center'>
				<Link
					href='/'
					className={`uppercase text-white  hover:text-light-green transition-colors duration-300 text-2xl ${gantari.className}`}>
					Anoopfolio
				</Link>

				<button
					type='button'
					onClick={toggleMenu}
					className='rounded-3xl text-2xl p-1.5 flex justify-center items-center hover:text-white bg-white hover:bg-light-green transition-colors duration-300'>
					<span className='sr-only'> Menu </span>
					{isMenuOpen ? <CgClose /> : <CgMenu />}
				</button>
			</header>
			{isMenuOpen && <NavMenu />}
		</>
	)
}

export default Header
