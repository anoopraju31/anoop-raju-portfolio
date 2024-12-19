import { type FC } from 'react'
import { type Metadata } from 'next'
import { PT_Sans } from 'next/font/google'
import { Particles } from '@/components/Particles'
import RegularPage from './RegularPage'

const ptSans = PT_Sans({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Contact Me'
}

const ContactPage: FC = () => {
	return (
		<main className={`bg-dark-blue text-white relative ${ptSans.className}`}>
			<Particles className='fixed inset-0 -z-10' />
			<RegularPage />
		</main>
	)
}

export default ContactPage
