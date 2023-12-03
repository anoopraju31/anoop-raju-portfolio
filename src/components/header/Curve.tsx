'use client'

import useWindowWidth from '@/app/hooks/useWindowWidth'
import { motion } from 'framer-motion'

const Curve = () => {
	const width = useWindowWidth()

	const initialPath = `m0 100 L0 200 L${width} 200 L${width} 100 Q${
		width / 2
	} -100 0 100`

	const targetPath = `m0 100 L0 200 L${width} 200 L${width} 100 Q${
		width / 2
	} 100 0 100`

	const curve = {
		initial: {
			d: initialPath,
		},
		enter: {
			d: targetPath,
			transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
		},
		exit: {
			d: initialPath,
			transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
		},
	}

	console.log(width)

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
