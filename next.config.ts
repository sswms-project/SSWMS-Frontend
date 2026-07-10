import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactStrictMode: true,
  images: {
    qualities: [75, 90],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
