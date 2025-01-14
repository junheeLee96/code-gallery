"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const defaultContextValue: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {
    console.log("Default toggleTheme called");
  },
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    applyTheme(initialTheme);
    console.log("Initial theme set:", initialTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    console.log("toggleTheme called in provider");
    const newTheme = theme === "light" ? "dark" : "light";
    console.log("New theme:", newTheme);
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }, [theme]);

  const applyTheme = (newTheme: Theme) => {
    console.log("Applying theme:", newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  const value = {
    theme,
    toggleTheme,
  };

  console.log("ThemeProvider rendering, theme:", theme);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
