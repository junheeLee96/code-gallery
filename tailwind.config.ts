import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: { g: "720px", lg: "1024px" },
    extend: {
      height: {
        "screen-without-header": "calc(100vh - 56px)",
      },
      colors: {
        "markdown-bg": "rgb(35,35,31)",
        "light-gary": "#bbbbbb",
        "hover-text": "rgb(100, 149, 237)",
        "dark-bg": "rgb(26,26,28)",
        wrapper: "rgb(248, 248, 248)",
        "dark-wrapper": "black",
      },
    },
  },
  variants: { extend: { backgroundColor: ["dark", "hover", "dark:hover"] } },
  plugins: [],
} satisfies Config;
