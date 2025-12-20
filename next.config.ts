import type { NextConfig } from "next";
const path = require("path");

const nextConfig: NextConfig = {
  experimental: {
    instrumentationHook: true, // Enable instrumentation for performance monitoring
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
  sassOptions: {
    includePaths: ["./src/styles"],
    prependData: `@import "@/styles/abstracts/variables"; @import "@/styles/abstracts/mixins"; @import "@/styles/abstracts/functions";`,
    quietDeps: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "example.com",
      "images.unsplash.com",
      "via.placeholder.com",
      "picsum.photos",
      "cloudinary.com",
      "res.cloudinary.com",
      "firebasestorage.googleapis.com",
      "storage.googleapis.com",
    ], // Add your image domains here if needed
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
