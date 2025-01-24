import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/*.stories.@(js|jsx|ts|tsx)",
  ],
  theme: {
    screens: {
      "550-screen": "520px",
      "700-screen": "640px",
      "1024-screen": "1024px",
      "1200-screen": "1200px",
    },
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
