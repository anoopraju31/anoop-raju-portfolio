import { MouseEvent, ReactNode, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type Props = { children: ReactNode }

export default function MagneticContainer(props: Props) {
	const { children } = props
	const ref = useRef<HTMLDivElement | null>(null)
	const [position, setPosition] = useState({ x: 0, y: 0 })

	const handleMouse = (e: MouseEvent) => {
		const container = ref.current

		if (!container) return

		const { clientX, clientY } = e
		const { height, width, left, top } = container.getBoundingClientRect()
		const middleX = clientX - (left + width / 4)
		const middleY = clientY - (top + height / 4)
		setPosition({ x: middleX, y: middleY })
	}

	const reset = () => {
		setPosition({ x: 0, y: 0 })
	}

	const { x, y } = position
	return (
		<motion.div
			style={{ position: 'relative' }}
			ref={ref}
			onMouseMove={handleMouse}
			onMouseLeave={reset}
			animate={{ x, y }}
			transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}>
			{children}
		</motion.div>
	)
}
