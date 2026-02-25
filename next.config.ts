import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bootcamp-frontend-sources.abzdev2.com',
      },
    ],
  },
};

export default nextConfig;
