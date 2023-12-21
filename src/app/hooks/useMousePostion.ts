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
	const mousePositionWithRespectToScreen = useRef<MousePosition>({
		x: -1000,
		y: -1000,
	})

	const handleMousePosition = (e: MouseEvent) => {
		setMousePosition({ x: e.pageX, y: e.pageY })
		mousePositionWithRespectToScreen.current = {
			x: e.clientX,
			y: e.clientY,
		}
	}

	const handleMouseLeave = (e: MouseEvent) => {
		setMousePosition({
			x: e.clientX,
			y: window.innerHeight * 2,
		})
	}

	useEffect(() => {
		// const container = containerRef.current

		// if (!container) return

		document.addEventListener('mousemove', handleMousePosition)
		// document.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			document.removeEventListener('mousemove', handleMousePosition)
			// document.removeEventListener('mouseleave', handleMouseLeave)
		}
	}, [])

	return { ...mousePosition, containerRef }
}

export default useMousePosition
