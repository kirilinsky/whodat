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
            gray: { value: "#a0a0a0" },
            bg: { value: "#0a0a0a" },
            green: { value: "#4caf50" },
          },
        },
        fonts: {
          mono: { value: "var(--font-mono), monospace" },
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
