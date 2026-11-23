import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Free Vercel Hobby plan optimization: avoid edge image compute usage quota
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
