import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase limit for image uploads via Server Actions
    },
  },
  // Enable API routes body size limit
  serverExternalPackages: ['@pinata/sdk'],
  
  // API route configuration
  api: {
    bodyParser: {
      sizeLimit: '10mb', // API route body size limit
    },
    responseLimit: false,
  },
};

export default nextConfig;
