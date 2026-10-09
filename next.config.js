/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  async redirects() {
    return [
      {
        source: '/blogs/a-comprehensive-guide-to-react-hooks',
        destination: '/blogs/posts/a-comprehensive-guide-to-react-hooks',
        permanent: true,
      },
      {
        source: '/blogs/solid-principle-in-react-js-and-next-js',
        destination: '/blogs/posts/solid-principle-in-react-js-and-next-js',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
