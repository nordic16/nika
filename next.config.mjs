/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
                pathname: '/tmp/nika/**',
                port: '3000',
                protocol: 'https',
            }
        ]
    }
}

export default nextConfig;
