import { Cpu, MemoryStick, FolderGit2, GitCommitHorizontal } from "lucide-react";
import { PROJECTS } from "@/features/projects/data/projects";
import type { SystemStatItem, StackUsageItem, ActivityItemData } from "../types";

export const SYSTEM_STATS: SystemStatItem[] = [
  {
    label: "CPU",
    value: 74,
    icon: Cpu,
    color: "from-cyan-400 to-blue-500",
  },
  {
    label: "Memory",
    value: 58,
    icon: MemoryStick,
    color: "from-purple-400 to-fuchsia-500",
  },
  {
    label: "Projects",
    value: PROJECTS.length * 5,
    icon: FolderGit2,
    color: "from-emerald-400 to-green-500",
  },
  {
    label: "Commits",
    value: 91,
    icon: GitCommitHorizontal,
    color: "from-orange-400 to-red-500",
  },
];

export const STACK_USAGE: readonly StackUsageItem[] = [
  ["React", 95],
  ["Next.js", 92],
  ["Node.js", 90],
  ["React Native", 82],
  ["Docker", 75],
  ["MongoDB", 86],
  ["Elasticsearch", 72],
] as const;

export const RECENT_ACTIVITY: ActivityItemData[] = [
  {
    title: "Built Desktop Window Manager",
    time: "Today",
    description: "Successfully completed and merged into the production workspace.",
  },
  {
    title: "Added Wallpaper Engine",
    time: "Yesterday",
    description: "Successfully completed and merged into the production workspace.",
  },
  {
    title: "Electron Debugger",
    time: "2 days ago",
    description: "Successfully completed and merged into the production workspace.",
  },
  {
    title: "Notification System",
    time: "Last week",
    description: "Successfully completed and merged into the production workspace.",
  },
];
