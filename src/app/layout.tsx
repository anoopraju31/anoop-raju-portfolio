import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Bebas_Neue } from 'next/font/google'
import ReduxProvider from '@/components/ReduxProvider'
import './globals.css'

const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: 'Anoop Raju - Portfolio',
		template: 'Anoop Raju | %s'
	},
	description:
		"Discover Anoop's portfolio - a showcase of creative works and projects reflecting passion and expertise in ."
}

type Props = {
	children: ReactNode
}

export default function RootLayout(props: Props) {
	const { children } = props

	return (
		<html lang='en'>
			<body className={`${bebasNeue.className} antialiased`}>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	)
}
