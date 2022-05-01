/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_BOT_TOKEN: process.env.NEXT_PUBLIC_BOT_TOKEN,
        NEXT_PUBLIC_PICTURE_URL_PATH: process.env.NEXT_PUBLIC_PICTURE_URL_PATH
    },
    images: {
        domains: ["firebasestorage.googleapis.com"]
    }
}

module.exports = nextConfig
