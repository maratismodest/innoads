// const nextTranslate = require('next-translate-plugin');

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [process.env.NEXT_PUBLIC_IMAGES_DOMAIN],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_IMAGES_DOMAIN,
        // port: '',
        // pathname: '*',
      },
      {
        protocol: 'https',
        hostname: '*',
        // port: '',
        // pathname: '*',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  // async redirects() {
  //   if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
  //     return [];
  //   }
  //   return [
  //     {
  //       source: '/admin',
  //       destination: '/404',
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = withNextIntl(nextConfig);
