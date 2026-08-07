// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#2FA84F",
          hover: "#258A40",
          soft: "#E8F6EC",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#7E5A32",
          soft: "#F4EBDD",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F2B134",
          foreground: "#142016",
        },
        background: "#F6FAF5",
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#EDF5EC",
        },
        "text-primary": "#142016",
        "text-secondary": "#667066",
        border: "#DCE7DC",
        success: "#2FA84F",
        warning: "#D99000",
        error: "#C53B3B",
        // shadcn compatibility
        foreground: "#142016",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#142016",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#142016",
        },
        muted: {
          DEFAULT: "#EDF5EC",
          foreground: "#667066",
        },
        input: "#DCE7DC",
        ring: "#2FA84F",
        destructive: {
          DEFAULT: "#C53B3B",
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "18px",
        xl: "24px",
        full: "9999px",
        // shadcn defaults
        DEFAULT: "12px",
      },
      boxShadow: {
        card: "0 8px 24px rgba(20, 32, 22, 0.06)",
        "card-hover": "0 14px 36px rgba(20, 32, 22, 0.10)",
        focus: "0 0 0 3px rgba(47, 168, 79, 0.24)",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "96px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
