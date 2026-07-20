import type { LucideIcon } from "lucide-react";
import {
  UserRound,
  GitBranch,
  FolderTree,
  TerminalSquare,
  FileText,
  Activity,
  Mail,
  Settings2,
  LayoutGrid,
} from "lucide-react";

export type AppId =
  | "about"
  | "experience"
  | "projects"
  | "terminal"
  | "resume"
  | "monitor"
  | "contact"
  | "settings"
  | "portfolio";

export interface AppMeta {
  id: AppId;
  title: string;
  icon: LucideIcon;
  /** Accent used for the icon glyph + its dock/window tinted background */
  accent: string;
  width: number;
  height: number;
}

export const APP_REGISTRY: Record<AppId, AppMeta> = {
  portfolio: {
    id: "portfolio",
    title: "My Portfolio",
    icon: LayoutGrid,
    accent: "#6C63FF",
    width: 900,
    height: 650,
  },
  about: {
    id: "about",
    title: "About — developer.ts",
    icon: UserRound,
    accent: "#4C8DFF",
    width: 450,
    height: 350,
  },
  experience: {
    id: "experience",
    title: "Experience — git log",
    icon: GitBranch,
    accent: "#F97316",
    width: 560,
    height: 350,
  },
  projects: {
    id: "projects",
    title: "Projects — File Explorer",
    icon: FolderTree,
    accent: "#EAB308",
    width: 680,
    height: 460,
  },
  terminal: {
    id: "terminal",
    title: "Terminal",
    icon: TerminalSquare,
    accent: "#22C55E",
    width: 500,
    height: 350,
  },
  resume: {
    id: "resume",
    title: "Resume",
    icon: FileText,
    accent: "#0F766E",
    width: 600,
    height: 520,
  },
  monitor: {
    id: "monitor",
    title: "Developer Monitor",
    icon: Activity,
    accent: "#EF4444",
    width: 660,
    height: 480,
  },
  contact: {
    id: "contact",
    title: "Mail — New Message",
    icon: Mail,
    accent: "#3B82F6",
    width: 640,
    height: 420,
  },
  settings: {
    id: "settings",
    title: "Settings",
    icon: Settings2,
    accent: "#9B7EFF",
    width: 480,
    height: 440,
  },
};

export const DOCK_APPS: AppId[] = [
  "about",
  "experience",
  "projects",
  "terminal",
  "resume",
  "monitor",
  "contact",
  "portfolio",
];

export const DESKTOP_APPS: AppId[] = ["resume", "projects", "contact"];
