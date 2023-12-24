'use client'

import { useState, useEffect, useRef } from 'react'

type MousePosition = {
	x: number
	y: number
}

const useMousePosition = () => {
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: -400,
		y: -400,
	})
	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleMousePosition = (e: MouseEvent) => {
			setMousePosition({
				x: e.pageX,
				y: e.pageY,
			})
		}
		const handleScroll = () => {
			setMousePosition({
				x: -400,
				y: -400,
			})
		}

		document.addEventListener('mousemove', handleMousePosition)
		document.addEventListener('scroll', handleScroll)

		return () => {
			document.removeEventListener('mousemove', handleMousePosition)
			document.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return { ...mousePosition, containerRef }
}

export default useMousePosition
