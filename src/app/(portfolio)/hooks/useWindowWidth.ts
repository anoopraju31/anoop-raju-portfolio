'use client'

import { useEffect, useState } from 'react'

const useWindowWidth = () => {
	const [width, setWidth] = useState<number>(() => {
		if (typeof window !== 'undefined') {
			return window.innerWidth
		}
		return 1440
	})

	useEffect(() => {
		setWidth(window.innerWidth)

		const handleResize = () => {
			setWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return { width }
}

export default useWindowWidth
