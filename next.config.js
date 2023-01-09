const { i18n } = require('./next-i18next.config')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
})

const withMDX = require('@next/mdx')()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [process.env.NEXT_PUBLIC_IMAGES_DOMAIN, 'localhost'],
    },
    formats: ['image/avif', 'image/webp'],
    i18n,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}
module.exports = withPWA(withBundleAnalyzer(withMDX(nextConfig)))
