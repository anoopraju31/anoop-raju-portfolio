'use client'

import useWindowWidth from '@/app/(portfolio)/hooks/useWindowWidth'
import { motion, type Variants } from 'framer-motion'

type CurveProps = {
	isBackgroundDark: boolean
}

const Curve = (props: CurveProps) => {
	const { isBackgroundDark } = props
	const { width } = useWindowWidth()
	const safeWidth = width > 0 ? width : typeof window !== 'undefined' ? window.innerWidth : 1440

	const initialPath = `m0 100 L0 200 L${safeWidth} 200 L${safeWidth} 100 Q${safeWidth / 2} -100 0 100`
	const targetPath = `m0 100 L0 200 L${safeWidth} 200 L${safeWidth} 100 Q${safeWidth / 2} 100 0 100`

	const curve: Variants = {
		initial: {
			d: initialPath
		},
		enter: {
			d: targetPath,
			transition: { duration: 0.8, ease: [0.73, 0.06, 0.42, 0.835] }
		},
		exit: {
			d: initialPath,
			transition: { duration: 0.8, ease: [0.73, 0.06, 0.42, 0.835] }
		}
	}

	return (
		<svg
			className={`absolute left-0 -top-[99px] w-full h-[100px] overflow-visible ${
				isBackgroundDark ? 'fill-dark-blue' : 'fill-light-green'
			} stroke-none pointer-events-none z-10`}
		>
			<motion.path variants={curve} />
		</svg>
	)
}

export default Curve
