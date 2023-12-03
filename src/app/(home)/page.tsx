import About from './sections/About'
import Hero from './sections/hero/Hero'
import Projects from './sections/Projects'

export default function Home() {
	return (
		<main className='bg-black text-white'>
			<Hero />
			<Projects />
			<About />
		</main>
	)
}
