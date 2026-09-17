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
        // User's 6 Curated Brand Palette Colors:
        // 1. #02BAB9 (Vibrant Tropical Turquoise)
        // 2. #F18712 (Radiant Warm Amber / Orange)
        // 3. #059B8F (Deep Medical Teal)
        // 4. #0A7C97 (Deep Ocean Blue-Teal)
        // 5. #F5CD09 (Golden Sun Yellow)
        // 6. #01B3BF (Electric Aqua-Teal)
        palette: {
          teal1: "#02BAB9",
          orange: "#F18712",
          teal2: "#059B8F",
          ocean: "#0A7C97",
          yellow: "#F5CD09",
          aqua: "#01B3BF",
        },
        brand: {
          50: "#f0fbfb",
          100: "#d4f6f6",
          200: "#a9eeee",
          300: "#70e4e3",
          400: "#01B3BF", // Color 6: Electric Aqua
          500: "#02BAB9", // Color 1: Vibrant Teal
          600: "#059B8F", // Color 3: Deep Medical Teal (Primary)
          700: "#0A7C97", // Color 4: Deep Ocean Blue-Teal
          800: "#0A7C97",
          900: "#0A7C97",
          950: "#0A7C97",
          blue: "#059B8F",
          blueHover: "#0A7C97",
          royal: "#02BAB9",
          royalHover: "#059B8F",
          navy: "#0A7C97",
          cyan: "#01B3BF",
          ocean: "#0A7C97",
          surface: "#ffffff",
        },
        accent: {
          50: "#fef9e8",
          100: "#fdf2c6",
          200: "#fce38d",
          300: "#F5CD09", // Color 5: Golden Sun Yellow
          400: "#F5CD09",
          500: "#F18712", // Color 2: Radiant Warm Amber/Orange
          600: "#F18712",
          700: "#d36e09",
          800: "#af530b",
          900: "#743511",
          950: "#421b05",
          yellow: "#F5CD09",
          orange: "#F18712",
        },
        // General text in high-contrast crisp black
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#1e293b",
          500: "#0f172a",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
          950: "#000000",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
export default config;
