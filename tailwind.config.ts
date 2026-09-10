import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6", // primary teal
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        ayush: {
          50: "#fbf8f2",
          100: "#f6ede0",
          200: "#ecd9be",
          300: "#dfbf97",
          400: "#d0a170",
          500: "#b87d46", // warm ayurvedic bronze/ochre
          600: "#a6683b",
          700: "#8a5133",
          800: "#70432f",
          900: "#5d3829",
          herb: "#4d7c0f", // herbal green
        },
        sage: {
          50: "#f4f7f4",
          100: "#e6ede6",
          200: "#d0ded0",
          300: "#adcbac",
          400: "#86af84",
          500: "#659363",
          600: "#4f754d",
          700: "#405d3f",
          800: "#364b35",
          900: "#2e3e2e",
        },
        crimson: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        clinical: {
          dark: "#0b132b",
          cardDark: "#1c2541",
          surfaceDark: "#1e293b",
          borderDark: "#334155",
          light: "#f8fafc",
          cardLight: "#ffffff",
          borderLight: "#e2e8f0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scanner": "scan 2.4s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "wave": "wave 1.2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        scan: {
          "0%, 100%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        wave: {
          "0%, 100%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
