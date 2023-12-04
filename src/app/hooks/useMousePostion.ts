import { useState, useEffect, useRef } from 'react'

type MousePosition = {
	x: number
	y: number
}

const useMousePosition = () => {
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: -1000,
		y: -1000,
	})
	const containerRef = useRef<HTMLDivElement | null>(null)

	const handleMousePosition = (e: MouseEvent) => {
		setMousePosition({ x: e.clientX, y: e.clientY })
	}

	const handleMouseLeave = (e: MouseEvent) => {
		setMousePosition({
			x: e.clientX,
			y: window.innerHeight * 2,
		})
	}

	useEffect(() => {
		const container = containerRef.current

		if (!container) return

		container.addEventListener('mousemove', handleMousePosition)
		container.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			container.removeEventListener('mousemove', handleMousePosition)
			container.removeEventListener('mouseleave', handleMouseLeave)
		}
	}, [])

	return { ...mousePosition, containerRef }
}

export default useMousePosition
