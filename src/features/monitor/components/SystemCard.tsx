"use client";

import type { SystemStatItem } from "../types";

interface SystemCardProps extends SystemStatItem {
  mounted: boolean;
}

export function SystemCard({
  label,
  value,
  icon: Icon,
  color,
  mounted,
}: SystemCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-cyan-500/15 bg-[#030612]/70 p-4 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-15 transition-opacity duration-300 group-hover:opacity-25 ${color}`}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wider text-cyan-300/80">
            {label}
          </span>
          <Icon size={18} className="text-cyan-400/80 transition-colors group-hover:text-cyan-200" />
        </div>

        <div className="mt-3 font-mono text-3xl font-extrabold tracking-tight text-cyan-100">
          {value}
          <span className="text-sm font-semibold text-cyan-400/60">%</span>
        </div>

        <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-cyan-950/60 border border-cyan-500/20">
          <div
            className={`h-full rounded-full bg-gradient-to-r shadow-[0_0_8px_currentColor] ${color} transition-all duration-[1600ms]`}
            style={{
              width: mounted ? `${value}%` : "0%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
