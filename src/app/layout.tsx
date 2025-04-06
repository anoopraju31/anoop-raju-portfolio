import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Bebas_Neue } from 'next/font/google'
import ReduxProvider from '@/components/ReduxProvider'
import './globals.css'

const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: 'Anoop Raju | Frontend Developer & Web Creator',
		template: '%s | Anoop Raju'
	},
	description:
		'Explore the portfolio of Anoop Raju, a passionate frontend developer skilled in React, TypeScript, Next.js, and Tailwind CSS. Check out projects, case studies, and design implementations focused on clean UI and seamless user experiences.'
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
