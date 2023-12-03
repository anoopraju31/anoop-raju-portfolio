import Link from 'next/link'
import { motion } from 'framer-motion'
import { menuSlide } from '@/utills/animations'
import Curve from './Curve'

const NavMenu = () => {
	return (
		<motion.div
			variants={menuSlide}
			initial='initial'
			animate='enter'
			exit='exit'
			className='fixed top-0 left-0 right-0 z-40 h-screen bg-light-green flex justify-center items-center'>
			<nav className='group flex flex-col justify-center items-center text-black'>
				<Link
					href='/'
					className='text-[8vh] lg:text-[15vh] font-bold leading-none uppercase hover:scale-75 hover:text-black transition-all duration-300'>
					Home
				</Link>
				<Link
					href='/projects'
					className='text-[8vh] lg:text-[15vh] font-bold leading-none uppercase hover:scale-75 hover:text-black transition-all duration-300'>
					Projects
				</Link>
				<Link
					href='/contact'
					className='text-[8vh] lg:text-[15vh] font-bold leading-none uppercase hover:scale-75 hover:text-black transition-all duration-300'>
					Contact
				</Link>
			</nav>
			<Curve />
		</motion.div>
	)
}

export default NavMenu
