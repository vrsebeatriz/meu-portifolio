import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        prime: {
          DEFAULT: "#e45447", // Vibrant Orange-Red
          light: "#f3877e",
          dark: "#b53a2f",
        },
        beige: {
          DEFAULT: "#f2f0ee", // Soft Beige
          light: "#faf9f8",
          dark: "#d8c7b8",
        },
        charcoal: {
          DEFAULT: "#2b2929", // Deep Charcoal
          dark: "#0d1017",
        },
        muted: {
          DEFAULT: "#607393", // Muted Blue
        },
        gold: {
          DEFAULT: "#e29d51", // Gold
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-outfit)"],
      },
    },
  },
  plugins: [],
};
export default config;
