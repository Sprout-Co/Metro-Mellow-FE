import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        baloo2: ["var(--font-baloo2)", "Baloo 2", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        heading: ["var(--font-baloo2)", "Baloo 2", "sans-serif"],
        body: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
