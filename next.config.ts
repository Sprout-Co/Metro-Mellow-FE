import type { NextConfig } from "next";
const path = require("path");

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        "@": path.resolve(__dirname, "src"),
      },
      rules: {
        "*.scss": {
          loaders: ["sass-loader"],
        },
      },
    },
  },
  reactStrictMode: true,
  trailingSlash: false, // Ensure no trailing slashes for SEO consistency
  sassOptions: {
    includePaths: ["./src/styles"],
    prependData: `@import "@/styles/abstracts/variables"; @import "@/styles/abstracts/mixins"; @import "@/styles/abstracts/functions";`,
    quietDeps: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  typescript: {
    // !! WARNING !!
    // Dangerously allow production builds to successfully complete even if
    // your project has TypeScript type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Ignore SCSS errors and warnings
    config.ignoreWarnings = [{ module: /\.scss$/ }];
    return config;
  },
};

export default nextConfig;
