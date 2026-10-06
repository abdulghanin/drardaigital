import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        border: "var(--border)",
        dara: {
          blue: "#035AF7",
          bright: "#02A1FC",
          light: "#4FD0FA",
          dark: "#16161E",
          white: "#FEFEFE",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "#FEFEFE",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        arabic: ["var(--font-arabic)"],
      },
      backgroundImage: {
        "dara-gradient": "linear-gradient(135deg, #035AF7 0%, #02A1FC 55%, #4FD0FA 100%)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(22,22,30,0.04), 0 8px 24px -12px rgba(3,90,247,0.12)",
        "card-hover": "0 4px 8px rgba(22,22,30,0.06), 0 16px 32px -12px rgba(3,90,247,0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
