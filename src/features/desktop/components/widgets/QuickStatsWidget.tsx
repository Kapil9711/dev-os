"use client";

import { DEV } from "@/constants/dev";

function StatRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-[5px] text-xs">
      <span className="text-[var(--text-2)]">{k}</span>
      <span className="font-bold">{v}</span>
    </div>
  );
}

export function QuickStatsWidget() {
  return (
    <div className="glass-panel rounded-[18px] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
      <div className="mb-2.5 text-[10.5px] uppercase tracking-wider text-[var(--text-2)]">
        Quick Stats
      </div>
      <StatRow
        k="Status"
        v={
          <span className="flex items-center gap-1.5 text-success">
            <span className="pulse-dot" />
            Open to work
          </span>
        }
      />
      <StatRow k="Experience" v={DEV.experience} />
      <StatRow k="Projects" v={String(20)} />
    </div>
  );
}
