/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const withMDX = require('@next/mdx')()
const {i18n} = require('./next-i18next.config');
var path = require("path");

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
    },
    i18n,
    localePath: path.resolve("./locales")
}

module.exports = withPWA(withMDX(nextConfig))
