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
    additionalData: (content, loaderContext) => {
      // Only add imports for component module files
      if (loaderContext.resourcePath.includes('.module.scss')) {
        return `@use "@/styles/abstracts/mixins" as *;\n${content}`;
      }
      return content;
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [], // Add your image domains here if needed
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
