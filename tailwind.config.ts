import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", ".dark"],
  content:  ["./src/**/*.{ts,tsx,scss}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "var(--brand-50)", 100: "var(--brand-100)", 200: "var(--brand-200)",
          300: "var(--brand-300)", 400: "var(--brand-400)", 500: "var(--brand-500)",
          600: "var(--brand-600)", 700: "var(--brand-700)", 800: "var(--brand-800)",
          900: "var(--brand-900)", 950: "var(--brand-950)",
        },
        gold: { 400: "#f5c842", 500: "#e6b800" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Syne", "sans-serif"],
        body:    ["var(--font-body)", "DM Sans", "sans-serif"],
      },
      animation: {
        shimmer:   "shimmer 1.5s infinite",
        "fade-up": "fadeUp 0.5s ease forwards",
        float:     "float 3s ease-in-out infinite",
      },
      keyframes: {
        shimmer:  { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        fadeUp:   { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        float:    { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
    },
  },
  plugins: [],
};
export default config;
