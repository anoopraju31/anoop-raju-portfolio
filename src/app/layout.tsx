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
		'Explore the portfolio of Anoop Raju, a passionate frontend developer skilled in React, TypeScript, Next.js, and Tailwind CSS. Check out projects, case studies, and design implementations focused on clean UI and seamless user experiences.',
	keywords: [
		'Anoop Raju',
		'Frontend Developer',
		'React Developer',
		'Next.js Portfolio',
		'TypeScript Developer',
		'Web Developer India',
		'Tailwind CSS',
		'UI/UX Developer',
		'JavaScript Portfolio',
		'Web Projects',
		'Developer Portfolio 2025'
	],
	openGraph: {
		title: 'Anoop Raju | Frontend Developer & Web Creator',
		description:
			'Dive into the portfolio of Anoop Raju, showcasing interactive frontend projects built with React, TypeScript, and modern UI tools.',
		url: 'https://anoopraju31.xyz',
		type: 'website',
		siteName: 'Anoop Raju Portfolio',
		images: [
			{
				url: 'https://anoopraju31.xyz/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Anoop Raju Portfolio Preview'
			}
		]
	}
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
