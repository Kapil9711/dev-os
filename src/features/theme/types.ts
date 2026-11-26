import type { LucideIcon } from "lucide-react";

export type ThemeId = "cyberpunk";

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  icon: LucideIcon;
  colors: {
    bg: string;
    accent: string;
    accent2: string;
    border: string;
    text: string;
  };
}
