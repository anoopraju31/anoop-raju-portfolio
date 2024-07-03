'use client'
import { useEffect } from 'react'
import MaskPage from './MaskPage'
import RegularPage from './RegularPage'
import { Particles } from '@/components/Particles'

export default function Home() {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
		})
	}, [])

	return (
		<main className='bg-dark-blue text-white relative z-10'>
			<Particles className='fixed inset-0 -z-10 h-screen' />
			<MaskPage />
			<RegularPage />
		</main>
	)
}
