'use client'

import { ReactNode, useRef } from 'react'
import {
	motion,
	useScroll,
	useSpring,
	useTransform,
	useMotionValue,
	useVelocity,
	useAnimationFrame,
} from 'framer-motion'
import { wrap } from '@motionone/utils'

interface ParallaxProps {
	children: ReactNode
	baseVelocity: number
}

const ParallaxContainer = ({ children, baseVelocity = 100 }: ParallaxProps) => {
	const baseX = useMotionValue(0)
	const { scrollY } = useScroll()
	const scrollVelocity = useVelocity(scrollY)
	const smoothVelocity = useSpring(scrollVelocity, {
		damping: 50,
		stiffness: 400,
	})
	const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
		clamp: false,
	})

	const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

	const directionFactor = useRef<number>(1)
	useAnimationFrame((t, delta) => {
		let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

		if (velocityFactor.get() < 0) {
			directionFactor.current = -1
		} else if (velocityFactor.get() > 0) {
			directionFactor.current = 1
		}

		moveBy += directionFactor.current * moveBy * velocityFactor.get()

		baseX.set(baseX.get() + moveBy)
	})

	return (
		<div className='overflow-hidden leading-[0.8px] whitespace-nowrap flex'>
			<motion.div
				className='flex font-semibold uppercase md:text-4xl lg:text-5xl gap-[25px]'
				style={{ x }}>
				<div>{children} </div>
				<div>{children} </div>
				<div>{children} </div>
				<div>{children} </div>
			</motion.div>
		</div>
	)
}

export default ParallaxContainer
