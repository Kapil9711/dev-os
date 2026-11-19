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
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all duration-500 hover:scale-[1.02] hover:border-white/20">
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-20 ${color}`}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wide text-[var(--text-2)]">
            {label}
          </span>
          <Icon size={18} className="text-white/70" />
        </div>

        <div className="mt-3 text-4xl font-black">
          {value}
          <span className="text-base font-semibold text-white/50">%</span>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-[1800ms]`}
            style={{
              width: mounted ? `${value}%` : "0%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
