/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_BOT_TOKEN: process.env.NEXT_PUBLIC_BOT_TOKEN,
        NEXT_PUBLIC_FILE_SERVER: process.env.NEXT_PUBLIC_FILE_SERVER,
        NEXT_PUBLIC_SECRET: process.env.NEXT_PUBLIC_SECRET
    },
    images: {
        domains: ["firebasestorage.googleapis.com", "gitarist.shop", "chamala.tatar"]
    },
    pwa: {
        dest: 'public',
        runtimeCaching
    }
}

module.exports = withPWA(withBundleAnalyzer(nextConfig))
