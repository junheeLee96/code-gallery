"use client";

import { useTheme } from "@/app/providers/ThemeProvider";
import { Moon, SunMoon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center p-2 rounded-full w-10 h-6 transition-all border
      bg-wrapper dark:bg-[rgb(37,39,42)] border-slate-300 dark:border-slate-500"
    >
      <span
        className={`absolute  rounded-full transition-all flex items-center  ${
          theme === "light" ? "translate-x-2 bg-white" : "bg-gray-800"
        }`}
      >
        {theme === "light" ? (
          <SunMoon size={16} />
        ) : (
          <Moon stroke="white" size={16} />
        )}
      </span>
    </button>
  );
}
