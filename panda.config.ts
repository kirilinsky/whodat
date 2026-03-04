import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          dip: {
            red: { value: "#ff4d4d" },
            red_dark: { value: "#3a1a1a" },
            gray: { value: "#a0a0a0" },
            gray_light: { value: "#5c5c5c" },
            bg: { value: "#0a0a0a" },
            green: { value: "#4caf50" },
            gray_card: { value: "#0c0c0c" },
          },
        },
        fonts: {
          mono: { value: "var(--font-mono), monospace" },
        },
        fontWeights: {
          light: { value: 300 },
          bold: { value: 700 },
        },
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(255, 77, 77, 0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(255, 77, 77, 0.5)" },
        },
      },
    },
  },
  jsxFramework: "react",
  outdir: "styled-system",
});
