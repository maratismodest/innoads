const { i18n } = require('./next-i18next.config')

const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
})

const withMDX = require('@next/mdx')()

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [process.env.NEXT_PUBLIC_IMAGES_DOMAIN],
    },
    formats: ['image/avif', 'image/webp'],
    i18n,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}
module.exports = withPWA(withMDX(nextConfig))
