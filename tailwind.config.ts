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
          DEFAULT: "#00E5FF", // Vibrant Cyan
          light: "#7DF0FF",
          dark: "#0099AA",
        },
        charcoal: {
          DEFAULT: "#0f172a", // Slate 900
          dark: "#020617",    // Slate 950
          light: "#1e293b",   // Slate 800
        },
        beige: {
          DEFAULT: "#f8fafc", // Slate 50
          dark: "#94a3b8",    // Slate 400
        },
        muted: {
          DEFAULT: "#64748b", // Slate 500
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      animation: {
        'blob': "blob 7s infinite",
        'float': "float 6s ease-in-out infinite",
        'pulse-slow': "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
