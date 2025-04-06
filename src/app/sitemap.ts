import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	const links = [
		{
			link: '/',
			priority: 1.0
		},
		{
			link: '/contact',
			priority: 0.8
		},
		{
			link: '/blogs',
			priority: 0.9
		},
		{
			link: '/projects',
			priority: 0.8
		},
		{
			link: '/blogs/a-comprehensive-guide-to-react-hooks',
			priority: 0.8
		}
	]

	return links.map(({ link, priority }) => ({
		url: link,
		priority,
		lastmod: '2025-04-06T15:06:11+01:00'
	}))
}
