import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8081/:path*', // Proxy to Python backend
      },
    ];
  },
};

export default nextConfig;
