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
  },
};

export default nextConfig;
