import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
			<body className={inter.className}>{children}</body>
		</html>
	)
}
