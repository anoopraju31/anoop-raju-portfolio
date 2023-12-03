import { useState, useEffect } from 'react'

type MousePosition = {
	x: number
	y: number
}

const useMousePosition = () => {
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: -1000,
		y: -1000,
	})

	const updateMousePosition = (e: MouseEvent) => {
		setMousePosition({ x: e.clientX, y: e.clientY })
	}

	useEffect(() => {
		window.addEventListener('mousemove', updateMousePosition)

		return () => window.removeEventListener('mousemove', updateMousePosition)
	}, [])

	return mousePosition
}

export default useMousePosition
