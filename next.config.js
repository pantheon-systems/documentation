const path = require("path");

// Load the .env file for local development
// .env.development.local by default
require("dotenv").config({
  path: path.resolve(process.cwd(), ".env.development.local"),
});

function ensureEnvVariable(name) {
  if (process.env[name] == null) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        `No ${name} found.\nSee the README.md for information on setting this variable locally.`
      );
    } else if (process.env.NODE_ENV === "production") {
      console.warn(
        `No ${name} environment variable found.\nLink to your PCC Instance or set the ${name} environment variable in the settings tab in the dashboard\nIf your site does not require a backend to build, remove this check from the next.config.js.`
      );
    }
  }
}

if (process.env.IS_CICD !== "true") {
  ensureEnvVariable("PCC_SITE_ID");
  ensureEnvVariable("PCC_TOKEN");
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  env: {
    NEXT_PUBLIC_PCC_SITE_ID: process.env.PCC_SITE_ID,
    NEXT_PUBLIC_PCC_HOST: process.env.PCC_HOST,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.bfldr.com",
        pathname: "/MEM5087K/**",
      },
    ],
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
