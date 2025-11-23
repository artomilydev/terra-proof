import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase limit for image uploads
    },
  },
  // Enable API routes body size limit
  serverExternalPackages: ['@pinata/sdk'],
};

export default nextConfig;
