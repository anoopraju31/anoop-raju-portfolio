import { motion } from 'framer-motion'
import { menuSlide } from '@/utills/animations'
import Curve from '../Curve'
import NavLink from './NavLink'

const NavMenu = () => {
	return (
		<motion.div
			variants={menuSlide}
			initial='initial'
			animate='enter'
			exit='exit'
			className='fixed top-0 left-0 right-0 z-40 h-screen bg-light-green flex justify-center items-center'>
			<nav className='group flex flex-col justify-center items-center text-black'>
				<NavLink title='Home' link='/' />
				<NavLink title='Projects' link='/projects' />
				<NavLink title='Contact' link='/contact' />
			</nav>
			<Curve />
		</motion.div>
	)
}

export default NavMenu
