import type { Config } from "tailwindcss";
import containerQueries from "@tailwindcss/container-queries";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#070b14",
        panel: "#111827",
        line: "rgba(255,255,255,0.08)",
        glass: "rgba(255,255,255,0.06)",
        "glass-strong": "rgba(255,255,255,0.1)",
        accent: {
          DEFAULT: "#6c63ff",
          2: "#4c8dff",
          3: "#9b7eff",
        },
        ink: {
          1: "#edeff7",
          2: "#8b8da3",
        },
        success: "#4cd98a",
        warn: "#f5a85c",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        panel: "24px",
      },
      backdropBlur: {
        panel: "18px",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(30px,-40px) scale(1.08)" },
        },
        winOpen: {
          from: { opacity: "0", transform: "scale(0.92) translateY(14px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        drift: "drift 22s ease-in-out infinite",
        winOpen: "winOpen 0.28s cubic-bezier(0.2,0.9,0.3,1.2)",
        pulseDot: "pulse 2s infinite",
      },
    },
  },
  plugins: [containerQueries],
};

export default config;
