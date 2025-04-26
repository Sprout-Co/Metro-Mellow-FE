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
  sassOptions: {
    includePaths: ["./src/styles"],
    prependData: `@import "@/styles/abstracts/variables"; @import "@/styles/abstracts/mixins"; @import "@/styles/abstracts/functions";`,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [], // Add your image domains here if needed
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
