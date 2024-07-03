import { type MouseEvent, type ReactNode, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type Props = { children: ReactNode }
type Position = {
	x: number
	y: number
}

export default function MagneticContainer({ children }: Props) {
	const ref = useRef<HTMLDivElement | null>(null)
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 })

	const handleMouse = (e: MouseEvent) => {
		const container = ref.current

		if (!container) return

		const { clientX, clientY } = e
		const { height, width, left, top } = container.getBoundingClientRect()
		const middleX = clientX - (left + width / 2)
		const middleY = clientY - (top + height / 2)

		setPosition({ x: middleX, y: middleY })
	}

	const reset = () => setPosition({ x: 0, y: 0 })

	return (
		<motion.div
			style={{ position: 'relative' }}
			ref={ref}
			onMouseMove={handleMouse}
			onMouseLeave={reset}
			animate={position}
			transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}>
			{children}
		</motion.div>
	)
}
