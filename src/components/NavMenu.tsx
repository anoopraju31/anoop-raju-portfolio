import Link from 'next/link'
import React from 'react'

const NavMenu = () => {
	return (
		<div className='h-screen bg-dark-blue flex justify-center items-center'>
			<nav className='flex flex-col justify-center items-center text-white'>
				<Link
					href='/'
					className='text-[8vh] lg:text-[15vh] font-bold leading-none uppercase hover:scale-75 hover:text-light-green transition-all duration-300'>
					Home
				</Link>
				<Link
					href='/projects'
					className='text-[8vh] lg:text-[15vh] font-bold leading-none uppercase hover:scale-75 hover:text-light-green transition-all duration-300'>
					Projects
				</Link>
				<Link
					href='/contact'
					className='text-[8vh] lg:text-[15vh] font-bold leading-none uppercase hover:scale-75 hover:text-light-green transition-all duration-300'>
					Contact
				</Link>
			</nav>
		</div>
	)
}

export default NavMenu
