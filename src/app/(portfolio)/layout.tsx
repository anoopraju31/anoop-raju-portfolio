import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import ScrollToTopOnReload from '@/components/ScrollToTopOnReload'
import Header from '@/components/header/Header'
import Footer from '@/components/footer'
import { Toaster } from 'sonner'

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

export default function PortfolioLayout(props: Props) {
	const { children } = props

	return (
		<ScrollToTopOnReload>
			<Header />
			{children}
			<Footer />
			<Toaster />
		</ScrollToTopOnReload>
	)
}
