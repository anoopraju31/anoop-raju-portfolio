import { About, Hero, Projects } from './sections'

export default function Home() {
	return (
		<main className='bg-black text-white'>
			<Hero />
			<Projects />
			<About />
		</main>
	)
}
