import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1C2E",
          50: "#E8EDF3", 100: "#C5D1DC", 200: "#9BAFC1",
          300: "#718DA6", 400: "#4E748E", 500: "#2E5C79",
          600: "#1A4463", 700: "#0B2E4E", 800: "#0B1C2E", 900: "#060F1A",
        },
        teal: {
          DEFAULT: "#0D7A8A",
          50: "#E6F4F6", 100: "#C0E4E8", 200: "#8DCBD2",
          300: "#5AB2BC", 400: "#2D9AA7", 500: "#0D7A8A",
          600: "#0A5F6B", 700: "#07464F", 800: "#042E35", 900: "#02171B",
        },
        gold: {
          DEFAULT: "#C49A2C",
          50: "#FDF8EC", 100: "#F8EDCC", 200: "#F0D88E",
          300: "#E8C350", 400: "#D4A730", 500: "#C49A2C",
          600: "#A07D20", 700: "#7C6018", 800: "#58430F", 900: "#342607",
        },
        cream: { DEFAULT: "#FBF8F2", 100: "#FBF8F2", 200: "#F4EDD8" },
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        fadeUp: { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        scaleIn: { "0%": { opacity: "0", transform: "scale(0.95)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(135deg, #0B1C2E 0%, #1A3A52 100%)",
        "teal-gradient": "linear-gradient(135deg, #0D7A8A 0%, #0FA3B1 100%)",
        "gold-gradient": "linear-gradient(135deg, #C49A2C 0%, #E8C350 100%)",
        "hero-overlay": "linear-gradient(to right, rgba(11,28,46,0.92) 0%, rgba(11,28,46,0.6) 50%, rgba(11,28,46,0.2) 100%)",
      },
      boxShadow: {
        gold: "0 4px 24px -4px rgba(196,154,44,0.35)",
        navy: "0 4px 24px -4px rgba(11,28,46,0.25)",
        teal: "0 4px 20px -4px rgba(13,122,138,0.30)",
        card: "0 2px 12px rgba(11,28,46,0.06), 0 1px 4px rgba(11,28,46,0.04)",
        "card-hover": "0 8px 32px rgba(11,28,46,0.12)",
      },
      borderRadius: { "4xl": "2rem" },
    },
  },
  plugins: [],
};

export default config;
