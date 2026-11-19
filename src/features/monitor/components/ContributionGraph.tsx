"use client";

import type { HeatmapCell } from "../types";

interface ContributionGraphProps {
  cells: HeatmapCell[];
}

const CELL_COLORS = [
  "bg-white/5",
  "bg-cyan-900",
  "bg-cyan-700",
  "bg-cyan-500",
  "bg-cyan-300",
];

export function ContributionGraph({ cells }: ContributionGraphProps) {
  const total = cells.filter((c) => c.active).length;

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-2)]">
            Contributions
          </div>
          <div className="mt-1 text-xl font-bold">Engineering Activity</div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-black">{total}</div>
          <div className="text-xs text-white/40">Active Days</div>
        </div>
      </div>

      <div className="overflow-x-auto p-5">
        <div className="inline-flex gap-1">
          {Array.from({ length: 52 }).map((_, week) => (
            <div key={week} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((__, day) => {
                const cell = cells[week * 7 + day];
                if (!cell) return null;

                return (
                  <div
                    key={cell.id}
                    className={`h-3 w-3 rounded-[4px] transition-all duration-500 hover:scale-150 hover:ring-2 hover:ring-cyan-300 ${
                      cell.active ? CELL_COLORS[cell.value] ?? "bg-cyan-500" : "bg-white/5"
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
