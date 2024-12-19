'use client'

import useWindowWidth from '@/app/(portfolio)/hooks/useWindowWidth'
import { motion } from 'framer-motion'

type CurveProps = {
	isBackgroundDark: boolean
}

const Curve = (props: CurveProps) => {
	const { isBackgroundDark } = props
	const { width } = useWindowWidth()

	const initialPath = `m0 100 L0 200 L${width} 200 L${width} 100 Q${width / 2} -100 0 100`

	const targetPath = `m0 100 L0 200 L${width} 200 L${width} 100 Q${width / 2} 100 0 100`

	const curve = {
		initial: {
			d: initialPath
		},
		enter: {
			d: targetPath,
			transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
		},
		exit: {
			d: initialPath,
			transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
		}
	}

	return (
		<svg
			className={`absolute right-0 -top-[99px] w-screen h-[100px] ${
				isBackgroundDark ? 'fill-dark-blue' : 'fill-light-green'
			} stroke-none`}
		>
			<motion.path variants={curve} initial='initial' animate='enter' exit='exit'></motion.path>
		</svg>
	)
}

export default Curve
