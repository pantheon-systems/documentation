const path = require("path");

// Load the .env file for local development
// .env.development.local by default
require("dotenv").config({
  path: path.resolve(process.cwd(), ".env.development.local"),
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {}, // Allow Turbopack builds (Next.js 16 default)
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.bfldr.com",
        pathname: "/MEM5087K/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Match _next/static files (JS chunks, CSS, etc)
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate",
          },
        ],
      },
    ];
  },
  generateBuildId: async () => {
    // Generate a unique build ID each time to ensure fresh chunk names
    return `build-${Date.now()}`;
  },
  webpack: (config, { buildId }) => {
    // Use buildId as hash salt so chunk filenames change with each build
    config.output.hashSalt = buildId;
    return config;
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
