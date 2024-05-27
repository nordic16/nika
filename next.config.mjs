/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
                pathname: '/**/*.jpeg',
                port: '',
                protocol: 'https',
            }
        ]
    }
}

export default nextConfig;
