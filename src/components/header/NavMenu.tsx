import Link from 'next/link'
import { motion } from 'framer-motion'
import { menuSlide, showAnimation, showTransition } from '@/utills/animations'
import Curve from './Curve'

type NavLinkProps = {
	title: string
	link: string
}

const NavLinks = (props: NavLinkProps) => {
	const { title, link } = props
	return (
		<Link
			href={link}
			className='text-[8vh] lg:text-[15vh] font-bold leading-none uppercase hover:scale-75 hover:text-black transition-all duration-300'>
			<motion.span
				variants={showAnimation}
				initial='initial'
				whileInView='animate'
				exit='exit'
				viewport={{ once: true }}
				transition={showTransition}>
				{title}
			</motion.span>
		</Link>
	)
}

const NavMenu = () => {
	return (
		<motion.div
			variants={menuSlide}
			initial='initial'
			animate='enter'
			exit='exit'
			className='fixed top-0 left-0 right-0 z-40 h-screen bg-light-green flex justify-center items-center'>
			<nav className='group flex flex-col justify-center items-center text-black'>
				<NavLinks title='Home' link='/' />
				<NavLinks title='Projects' link='/projects' />
				<NavLinks title='Contact' link='/contact' />
			</nav>
			<Curve />
		</motion.div>
	)
}

export default NavMenu
