type Project = {
	id: number
	img: string
	deployedUrl: string
	name: string
	year: string
}

export const projects: Project[] = [
	{
		id: 1,
		img: '/dropbox.png',
		deployedUrl: 'https://github.com/anoopraju31/nextjs-dropbox-clone',
		name: 'Dropbox Clone',
		year: '2023'
	},
	{
		id: 2,
		img: '/eat-curious.png',
		deployedUrl: 'https://github.com/anoopraju31/eat-curious',
		name: 'Eat Curious',
		year: '2023'
	},
	{
		id: 3,
		img: '/summerize.png',
		deployedUrl: 'https://github.com/anoopraju31/ai-article-summarizer',
		name: 'Summerize',
		year: '2023'
	},
	{
		id: 4,
		img: '/netflix-gpt.png',
		deployedUrl: 'https://github.com/anoopraju31/netflix-gpt',
		name: 'Netflix GPT',
		year: '2023'
	},
	{
		id: 5,
		img: '/nike.png',
		deployedUrl: 'https://github.com/anoopraju31/nike-landing-page',
		name: 'Nike Landing Page',
		year: '2023'
	}
]

export const skills = [
	'HTML',
	'CSS',
	'JavaScript',
	'Typescript',
	'ReactJS',
	'NextJS',
	'TailwindCSS',
	'Figma',
	'Framer Motion'
]

export const services = ['Web Development', 'Web Design']

export type ProjectProps = {
	id: number
	name: string
	description: string
	technologies: string[]
	github: string
	demo: string
	image: string
	available: boolean
}

export const devProjects = [
	{
		id: 0,
		name: 'Flixify',
		description:
			'Flixify lets you seamlessly explore movies and TV series, add bookmarks, and search across all pages. It offers user authentication along with a theme switch.',
		technologies: ['Next.js', 'Typescript', 'Prisma'],
		github: 'https://github.com/victorcodess/flixify',
		demo: 'https://flixify.victorwilliams.me/',
		image: '/nike.png',
		available: true
	},
	{
		id: 1,
		name: 'SkyWatch',
		description:
			'SkyWatch is a convenient and user-friendly tool that allows you to quickly and easily check the current weather and forecast for the next 2 days in any city.',
		technologies: ['React', 'CSS', 'Chart.js'],
		github: 'https://github.com/victorcodess/weather-forecast-website',
		demo: 'https://sky-watch.vercel.app/',
		image: '/nike.png',
		available: true
	},
	{
		id: 2,
		name: 'Alpaca Image Generator',
		description: 'An image generator website that allows users to generate, combine, and download images.',
		technologies: ['React', 'CSS', 'Merge Images'],
		github: 'https://github.com/victorcodess/alpaca-image-generator',
		demo: 'http://alpaca-image-generator-beta.vercel.app',
		image: '/nike.png',
		available: true
	},
	{
		id: 3,
		name: 'Link Shortener',
		description: "A website that reduces the length of your URL using Bit.ly's API",
		technologies: ['JavaScript', 'CSS', "Bit.ly's API"],
		github: 'https://github.com/victorcodess/url-shortener',
		demo: 'https://url-shortener-nine-delta.vercel.app',
		image: '/nike.png',
		available: true
	}
]

export type Experience = {
	id: string
	companyName: string
	position: string
	duration: string
	description: string[]
}

export const accordionData: Experience[] = [
	// {
	// 	id: 'accordion-1',
	// 	companyName: 'Infigon Futures',
	// 	position: 'Frontend Developer',
	// 	duration: 'Feb 2025 - Present',
	// 	description:
	// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.'
	// },
	{
		id: 'accordion-2',
		companyName: 'Infigon Futures',
		position: 'Frontend Developer - Intern',
		duration: 'Aug 2024 - Present',
		description: [
			'Spearheaded the development of a new, user-friendly company website, resulting in a 20% increase in site traffic and improved user engagement.',
			'Enhanced the responsiveness of existing web applications, ensuring seamless functionality across devices, boosting mobile user satisfaction by 30%.',
			'Optimized website SEO, leading to a 15% improvement in search engine rankings and greater online visibility.',
			'Collaborated with cross-functional teams to implement scalable and performance-driven front-end solutions using modern tools and frameworks.'
		]
	},
	{
		id: 'accordion-3',
		companyName: 'Tridashay Private Limited',
		position: 'Frontend Developer - Intern',
		duration: 'Feb 2022 - Jun 2022',
		description: [
			'Revamped the company website, improving page load speed by 30% and enhancing overall user engagement.',
			'Collaborated on the development of 5+ real-time projects, delivering scalable, responsive front-end solutions to meet diverse client needs.',
			'Built and rigorously tested 10+ reusable components, reducing development time for future projects by 20%.'
		]
	}
]
