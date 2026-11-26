"use client";

import { DEV } from "@/constants/dev";
import { Activity } from "lucide-react";

function StatRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-cyan-500/10 py-2 text-[12px] last:border-b-0">
      <span className="text-[var(--text-2)] font-medium">{k}</span>
      <span className="font-mono font-bold text-cyan-100">{v}</span>
    </div>
  );
}

export function QuickStatsWidget() {
  return (
    <div className="glass-panel group relative overflow-hidden rounded-[18px] border-cyan-500/25 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition duration-200 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]">
      {/* Top subtle HUD tag */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan-400/80">
          <Activity size={11} className="text-cyan-400" />
          <span>Telemetry // Stats</span>
        </div>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#00ff88]" />
      </div>

      <div className="divide-y divide-cyan-500/10">
        <StatRow
          k="Status"
          v={
            <span className="flex items-center gap-1.5 font-sans text-[11.5px] font-semibold text-emerald-400">
              <span className="pulse-dot" />
              Open to work
            </span>
          }
        />
        <StatRow k="Experience" v={DEV.experience} />
        <StatRow k="Projects" v="20+ Shipped" />
      </div>
    </div>
  );
}
