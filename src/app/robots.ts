import type { MetadataRoute } from 'next'

export default async function robots(): Promise<MetadataRoute.Robots> {
	return {
		rules: [
			{
				userAgent: '*',
				allow: ['/', '/projects', '/contact', '/blogs'],
				disallow: ['/studio']
			}
		],
		sitemap: 'https://www.anoopraju.xyz/sitemap.xml'
	}
}
