import type { Metadata } from 'next'
import { Bebas_Neue } from 'next/font/google'

import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Anoop Raju - Portfolio',
	description:
		"Discover Anoop's portfolio - a showcase of creative works and projects reflecting passion and expertise in .",
}

type Props = {
	children: React.ReactNode
}

export default function RootLayout(props: Props) {
	const { children } = props

	return (
		<html lang='en'>
			<body className={bebasNeue.className}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}
