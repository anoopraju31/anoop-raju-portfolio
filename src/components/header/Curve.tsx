import { curve } from '@/utills/animations'
import { motion } from 'framer-motion'

const Curve = () => {
	return (
		<svg className='absolute right-0 -top-[99px] w-screen h-[100px] fill-light-green stroke-none'>
			<motion.path
				variants={curve}
				initial='initial'
				animate='enter'
				exit='exit'></motion.path>
		</svg>
	)
}

export default Curve
