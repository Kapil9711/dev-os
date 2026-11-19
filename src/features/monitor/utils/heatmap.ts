import type { HeatmapCell } from "../types";

export function buildHeatmap(): HeatmapCell[] {
  return Array.from({ length: 52 }).flatMap((_, week) =>
    Array.from({ length: 7 }).map((__, day) => ({
      id: `${week}-${day}`,
      value: Math.floor(Math.random() * 5),
      active: Math.random() > 0.55,
    })),
  );
}
