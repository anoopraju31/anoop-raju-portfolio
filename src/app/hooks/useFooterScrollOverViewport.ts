'use client'

import { useEffect, useState } from 'react'

const useFooterScrollOverViewport = () => {
	const [isFooterCrossedViewport, setIsFooterCrossedViewport] =
		useState<boolean>(false)

	useEffect(() => {
		const footer = document.getElementById('footer')
		const handleHeaderColorChangeOnScroll = () => {
			if (!footer) return

			const footerRect = footer.getBoundingClientRect()
			setIsFooterCrossedViewport(footerRect.top <= 74)
		}

		document.addEventListener('scroll', handleHeaderColorChangeOnScroll)

		return () =>
			document.removeEventListener('scroll', handleHeaderColorChangeOnScroll)
	}, [])

	return isFooterCrossedViewport
}

export default useFooterScrollOverViewport
