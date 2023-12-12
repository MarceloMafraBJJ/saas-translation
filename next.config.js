/** @type {import('next').NextConfig} */
/*
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'lh3.googleusercontent.com' },
        ],
    },
}

module.exports = nextConfig */

const nextConfig = {
    images: {
        domains: [
            'lh3.googleusercontent.com'
        ],
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig 
