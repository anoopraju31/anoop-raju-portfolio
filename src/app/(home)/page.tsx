import { Particles } from '@/components/Particles'
import MaskPage from './MaskPage'
import RegularPage from './RegularPage'

export default function Home() {
	return (
		<main className='bg-dark-blue text-white relative z-10'>
			<Particles className='fixed inset-0 -z-10 h-screen' />
			<MaskPage />
			<RegularPage />
		</main>
	)
}
