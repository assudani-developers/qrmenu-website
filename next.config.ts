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
  // keep /app/ with its slash so the owner app's service worker (scope /app/) controls the page
  skipTrailingSlashRedirect: true,
  // the owner app (Flutter web build in public/app) — works in any browser and installs on iPhone
  async rewrites() {
    return [
      { source: '/app/', destination: '/app/index.html' },
    ];
  },
  async headers() {
    return [
      { source: '/app/push-sw.js', headers: [{ key: 'Cache-Control', value: 'no-cache' }] },
      { source: '/app/index.html', headers: [{ key: 'Cache-Control', value: 'no-cache' }] },
      { source: '/app/main.dart.js', headers: [{ key: 'Cache-Control', value: 'no-cache' }] },
    ];
  },
};

export default nextConfig;
