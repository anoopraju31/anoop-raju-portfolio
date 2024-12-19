'use client'

import { useState, useRef, useLayoutEffect } from 'react'
import useAppDispatch from './useAddDispatch'
import useAppSelector from './useAppSelector'
import { projectCardMouseLeave } from '../features/projectCardSlice'

type MousePosition = {
	x: number
	y: number
}

const useMousePosition = () => {
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: -400,
		y: -400
	})
	const containerRef = useRef<HTMLDivElement | null>(null)
	const dispatch = useAppDispatch()
	const cardId = useAppSelector((state) => state.projectCardHover.cardId)

	useLayoutEffect(() => {
		const handleMousePosition = (e: MouseEvent) => {
			setMousePosition({
				x: e.pageX,
				y: e.pageY
			})
		}
		const handleScroll = () => {
			setMousePosition({
				x: -400,
				y: -400
			})
			if (cardId) dispatch(projectCardMouseLeave())
		}

		document.addEventListener('mousemove', handleMousePosition)
		document.addEventListener('scroll', handleScroll)

		return () => {
			document.removeEventListener('mousemove', handleMousePosition)
			document.removeEventListener('scroll', handleScroll)
		}
	}, [dispatch, cardId])

	return { ...mousePosition, containerRef }
}

export default useMousePosition
