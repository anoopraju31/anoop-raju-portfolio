import Hero from './sections/Hero'
import Projects from './sections/Projects'

export default function Home() {
	return (
		<main className='h-[200vh] bg-dark-blue text-white'>
			<Hero />
			<Projects />
		</main>
	)
}
