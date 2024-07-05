'use client'

import { useState, useRef, useLayoutEffect } from 'react'
import useAppDispatch from './useAddDispatch'
import { projectCardMouseLeave } from '../features/projectCardSlice'

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
	const dispatch = useAppDispatch()

	useLayoutEffect(() => {
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
			dispatch(projectCardMouseLeave())
		}

		document.addEventListener('mousemove', handleMousePosition)
		document.addEventListener('scroll', handleScroll)

		return () => {
			document.removeEventListener('mousemove', handleMousePosition)
			document.removeEventListener('scroll', handleScroll)
		}
	}, [dispatch])

	return { ...mousePosition, containerRef }
}

export default useMousePosition
