import { About, Hero, Projects } from './sections'
import Skills from './sections/Skills'

export default function Home() {
	return (
		<main className='bg-black text-white'>
			<Hero />
			<Projects />
			<About />
			<Skills />
		</main>
	)
}
