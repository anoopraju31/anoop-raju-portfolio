import { motion } from 'framer-motion'
import { menuSlide } from '@/utills/animations'
import Curve from '../Curve'
import styles from './navMenu.module.css'

type LinkPlaceholderProps = {
	title: string
}

const LinkPlaceholder = (props: LinkPlaceholderProps) => {
	const { title } = props
	return (
		<p className='text-[8vh] lg:text-[15vh] font-bold leading-none uppercase hover:scale-75 transition-all duration-300'>
			{title}
		</p>
	)
}

const NavMenuMask = () => {
	return (
		<motion.div
			variants={menuSlide}
			initial='initial'
			animate='enter'
			exit='exit'
			className={styles.mask}>
			<nav className={styles.nav}>
				<LinkPlaceholder title='Home' />
				<LinkPlaceholder title='Projects' />
				<LinkPlaceholder title='Contact' />
			</nav>
			<Curve />
		</motion.div>
	)
}

export default NavMenuMask
