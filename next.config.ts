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
  turbopack: {
    resolveAlias: {
      '../build/polyfills/polyfill-module': './src/lib/others/modern-polyfill.js',
      'next/dist/build/polyfills/polyfill-module': './src/lib/others/modern-polyfill.js',
    },
  },
};

export default nextConfig;
