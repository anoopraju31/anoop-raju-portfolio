import Link from 'next/link'
import { motion } from 'framer-motion'
import { showAnimation, showTransition } from '@/utills/animations'

type NavLinkProps = {
	title: string
	link: string
}

const NavLink = (props: NavLinkProps) => {
	const { title, link } = props
	return (
		<Link
			href={link}
			className='text-[8vh] lg:text-[15vh] flex font-bold leading-none uppercase hover:scale-75 z-50 transition-all duration-300'>
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

export default NavLink
