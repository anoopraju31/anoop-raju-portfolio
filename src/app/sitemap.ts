import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const links = [
    {
      link: '/',
      priority: 1.0,
    },
    {
      link: '/contact',
      priority: 0.7,
    },
    {
      link: '/blogs',
      priority: 0.8,
    },
    {
      link: '/projects',
      priority: 0.9,
    },
    {
      link: '/blogs/posts/a-comprehensive-guide-to-react-hooks',
      priority: 0.6,
    },
    {
      link: '/blogs/posts/solid-principle-in-react-js-and-next-js',
      priority: 0.6,
    },
  ];

  return links.map(({ link, priority }) => ({
    url: link,
    priority,
    lastmod: '2025-04-06T15:06:11+01:00',
  }));
}
