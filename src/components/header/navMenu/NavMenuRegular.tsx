import { motion } from 'framer-motion'
import { menuSlide } from '@/utills/animations'
import Curve from '../Curve'
import NavLink from './NavLink'
import styles from './navMenu.module.css'

const NavMenuRegular = () => {
	return (
		<motion.div
			variants={menuSlide}
			initial='initial'
			animate='enter'
			exit='exit'
			className={styles.main}>
			<nav className={styles.nav}>
				<NavLink title='Home' link='/' />
				<NavLink title='Projects' link='/projects' />
				<NavLink title='Contact' link='/contact' />
			</nav>
			<Curve />
		</motion.div>
	)
}

export default NavMenuRegular
