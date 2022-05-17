/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_BOT_TOKEN: process.env.NEXT_PUBLIC_BOT_TOKEN,
        NEXT_PUBLIC_PICTURE_URL_PATH: process.env.NEXT_PUBLIC_PICTURE_URL_PATH
    },
    images: {
        domains: ["firebasestorage.googleapis.com", "gitarist.shop"]
    },
    pwa: {
        dest: 'public',
        runtimeCaching
    }
}

module.exports = module.exports = withPWA(nextConfig)
