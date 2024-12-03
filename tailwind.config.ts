import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: { g: "720px" },
    extend: {
      width: {
        "dialog-width": "calc(100vw - 60px)",
      },
      borderRadius: {
        "sign-in-shape": "35% 0 0 35%",
        "sign-up-shape": "0px 35% 35% 0px;",
      },
      colors: {
        background: "var(--background)",
        // foreground: "var(--foreground)",
        "nav-background": "var(--nav-background)",
        "postcard-background": "var(--postcard-background)",
        "btn-hover-background": "var(--btn-hover-background)",
        "btn-hover-text": "#000",
        "code-background": "var(codebackground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
