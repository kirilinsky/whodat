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
    },
  },
  jsxFramework: "react",
  outdir: "styled-system",
});
