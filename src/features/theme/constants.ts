import { Zap } from "lucide-react";
import type { ThemeMeta } from "./types";

export const THEMES: readonly ThemeMeta[] = [
  {
    id: "cyberpunk",
    name: "Cyberpunk HUD",
    tagline: "Neon Cyan Ice & Luminance Glow",
    description: "High-tech netrunner interface with cyan ice luminance glow, neon accents, dark void backgrounds, and futuristic HUD lines.",
    badge: "Active // HUD v2.4",
    icon: Zap,
    colors: {
      bg: "#050811",
      accent: "#00f0ff",
      accent2: "#00b4d8",
      border: "rgba(0, 240, 255, 0.35)",
      text: "#e0f7fa",
    },
  },
] as const;

export const DEFAULT_THEME: ThemeMeta["id"] = "cyberpunk";
