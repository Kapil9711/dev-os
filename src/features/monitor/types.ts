import type { LucideIcon } from "lucide-react";

export interface SystemStatItem {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export type StackUsageItem = readonly [name: string, level: number];

export interface ActivityItemData {
  title: string;
  time: string;
  description?: string;
}

export interface HeatmapCell {
  id: string;
  value: number;
  active: boolean;
}
