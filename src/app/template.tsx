import PageTransitionLoader from '@/components/pageTransitionLoader'

type Props = {
	children: React.ReactNode
}

export default function RootLayout(props: Props) {
	const { children } = props

	return <PageTransitionLoader>{children}</PageTransitionLoader>
}
