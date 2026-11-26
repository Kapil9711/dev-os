"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ThemeId, ThemeMeta } from "../types";
import { THEMES, DEFAULT_THEME } from "../constants";

interface ThemeContextValue {
  theme: ThemeId;
  currentTheme: ThemeMeta;
  themes: readonly ThemeMeta[];
  setTheme: (theme: ThemeId) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "kapos-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
      if (stored && stored === "cyberpunk") {
        setThemeState(stored);
        document.documentElement.setAttribute("data-theme", stored);
      } else {
        setThemeState(DEFAULT_THEME);
        document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
      }
    } catch {
      document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
    }
    setMounted(true);
  }, []);

  const setTheme = useCallback((nextTheme: ThemeId) => {
    setThemeState(nextTheme);
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Storage unavailable or disabled
    }
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", nextTheme);
    }
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((prev) => {
      const ids = THEMES.map((t) => t.id);
      const currentIndex = ids.indexOf(prev);
      const nextIndex = (currentIndex + 1) % ids.length;
      const nextTheme = ids[nextIndex] ?? DEFAULT_THEME;
      try {
        localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch {
        // Storage unavailable or disabled
      }
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", nextTheme);
      }
      return nextTheme;
    });
  }, []);

  const currentTheme = useMemo(
    () => THEMES.find((t) => t.id === theme) ?? THEMES[0]!,
    [theme],
  );

  const value = useMemo(
    () => ({
      theme: mounted ? theme : DEFAULT_THEME,
      currentTheme,
      themes: THEMES,
      setTheme,
      cycleTheme,
    }),
    [theme, currentTheme, mounted, setTheme, cycleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
