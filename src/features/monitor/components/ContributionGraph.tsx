"use client";

import type { HeatmapCell } from "../types";
import { Activity } from "lucide-react";

interface ContributionGraphProps {
  cells: HeatmapCell[];
}

const CELL_COLORS = [
  "bg-cyan-950/40 border border-cyan-500/10",
  "bg-cyan-900 border border-cyan-500/30",
  "bg-cyan-700 border border-cyan-400/40",
  "bg-cyan-500 shadow-[0_0_6px_#00f0ff]",
  "bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]",
];

export function ContributionGraph({ cells }: ContributionGraphProps) {
  const total = cells.filter((c) => c.active).length;

  return (
    <section className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-950/20 to-[#040816]/70 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-cyan-500/15 px-6 py-4">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.25em] text-cyan-400/80">
            <Activity size={12} className="text-cyan-400" />
            <span>Contributions // 52-Week Matrix</span>
          </div>
          <div className="mt-1 text-xl font-bold tracking-tight text-cyan-100">
            Engineering Activity
          </div>
        </div>

        <div className="text-right">
          <div className="font-mono text-3xl font-extrabold text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
            {total}
          </div>
          <div className="font-mono text-[11px] text-slate-400">Active Days</div>
        </div>
      </div>

      <div className="overflow-x-auto p-5">
        <div className="inline-flex gap-1.5">
          {Array.from({ length: 52 }).map((_, week) => (
            <div key={week} className="flex flex-col gap-1.5">
              {Array.from({ length: 7 }).map((__, day) => {
                const cell = cells[week * 7 + day];
                if (!cell) return null;

                return (
                  <div
                    key={cell.id}
                    title={cell.active ? `Level ${cell.value}` : "No activity"}
                    className={`h-3 w-3 rounded-[3px] transition-all duration-300 hover:scale-150 hover:ring-2 hover:ring-cyan-300 ${
                      cell.active ? CELL_COLORS[cell.value] ?? "bg-cyan-400" : "bg-cyan-950/30 border border-cyan-500/10"
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
