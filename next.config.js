/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const webpack = require('webpack');
const runtimeCaching = require('next-pwa/cache')

const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_BOT_TOKEN: process.env.NEXT_PUBLIC_BOT_TOKEN,
        NEXT_PUBLIC_PICTURE_URL_PATH: process.env.NEXT_PUBLIC_PICTURE_URL_PATH
    },
    images: {
        domains: ["firebasestorage.googleapis.com"]
    },
    pwa: {
        dest: 'public',
        runtimeCaching
    },
    webpack: config => {
        // Optional: Enables reading mapbox token from environment variable
        config.plugins.push(new webpack.EnvironmentPlugin({MapboxAccessToken: 'pk.eyJ1IjoibWFyYXRpc21vZGVzdCIsImEiOiJjazkxZTQ3bjUwMXlrM2dwbGl6dTJlamdwIn0.K1EZNZRqVctUQx9BvKCy1A'}));
        return config;
    }
}

module.exports = module.exports = withPWA(nextConfig)
