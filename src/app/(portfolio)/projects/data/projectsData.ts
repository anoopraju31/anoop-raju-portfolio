export interface ProjectItem {
	id: number
	number: string
	name: string
	subtitle: string
	description: string
	year: string
	category: string
	img: string
	alt: string
	link: string
	github: string
	tools: string[]
	featured?: boolean
	siteDomain?: string
}

export const projectsList: ProjectItem[] = [
	{
		id: 1,
		number: '01',
		name: 'Eat Curious',
		subtitle: 'Plant-Based Sensory Web Platform',
		description:
			'An immersive digital culinary experience showcasing sustainable plant-based foods with kinetic layout transitions, smooth scroll pacing, and bespoke micro-interactions.',
		year: '2023',
		category: 'Creative Web',
		img: '/eat-curious.png',
		alt: 'Eat Curious Web App',
		link: 'https://eat-curious-wysm.vercel.app/',
		github: 'https://github.com/anoopraju31/eat-curious',
		tools: ['Next.js', 'React', 'TailwindCSS', 'TypeScript', 'Framer Motion'],
		featured: true,
		siteDomain: 'eat-curious-wysm.vercel.app'
	},
	{
		id: 2,
		number: '02',
		name: 'Summarizer',
		subtitle: 'AI Article Condensation Engine',
		description:
			'An intelligent SaaS utility integrating OpenAI GPT-4 to transform extensive online articles and research documents into clear, digestible, actionable summaries in seconds.',
		year: '2023',
		category: 'AI / Tooling',
		img: '/summerize.png',
		alt: 'AI Article Summarizer',
		link: 'https://react-ai-article-summarizer.netlify.app/',
		github: 'https://github.com/anoopraju31/ai-article-summarizer',
		tools: ['React', 'OpenAI API', 'TailwindCSS', 'JavaScript', 'RTK Query'],
		featured: false,
		siteDomain: 'react-ai-article-summarizer.netlify.app'
	},
	{
		id: 3,
		number: '03',
		name: 'Netflix GPT',
		subtitle: 'Intelligent Film Discovery Platform',
		description:
			'Conversational movie discovery ecosystem combining OpenAI natural language intelligence with TMDB film catalog metadata for tailored, mood-based cinematic recommendations.',
		year: '2023',
		category: 'AI / Full Stack',
		img: '/netflix-gpt.png',
		alt: 'Netflix GPT Application',
		link: 'https://github.com/anoopraju31/netflix-gpt',
		github: 'https://github.com/anoopraju31/netflix-gpt',
		tools: ['React', 'Firebase Auth', 'OpenAI GPT', 'TailwindCSS', 'TMDB API'],
		featured: false,
		siteDomain: 'github.com/anoopraju31/netflix-gpt'
	},
	{
		id: 4,
		number: '04',
		name: 'Nike Landing Page',
		subtitle: 'High-Impact Brand Commerce Concept',
		description:
			'A performance-tuned modern e-commerce landing experience celebrating modern athletic footwear with responsive typography, animated product spotlights, and fluid transitions.',
		year: '2023',
		category: 'Creative Web',
		img: '/nike.png',
		alt: 'Nike Landing Page Mockup',
		link: 'https://github.com/anoopraju31/nike-landing-page',
		github: 'https://github.com/anoopraju31/nike-landing-page',
		tools: ['React', 'TailwindCSS', 'JavaScript', 'Responsive UI'],
		featured: false,
		siteDomain: 'github.com/anoopraju31/nike-landing-page'
	},
	{
		id: 5,
		number: '05',
		name: 'Dropbox Clone',
		subtitle: 'Cloud Asset Storage & Management',
		description:
			'Full-stack cloud file management platform featuring drag-and-drop file ingestion, Firebase Firestore asset cataloging, secure user authentication, and responsive file previewing.',
		year: '2023',
		category: 'Full Stack',
		img: '/dropbox.png',
		alt: 'Dropbox Clone',
		link: 'https://nextjs-dropbox-clone.vercel.app/',
		github: 'https://github.com/anoopraju31/nextjs-dropbox-clone',
		tools: ['Next.js', 'Firebase Storage', 'TailwindCSS', 'TypeScript', 'Shadcn UI'],
		featured: false,
		siteDomain: 'nextjs-dropbox-clone.vercel.app'
	}
]
