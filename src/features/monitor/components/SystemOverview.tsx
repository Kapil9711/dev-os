"use client";

import { SYSTEM_STATS } from "../data/stats";
import { SystemCard } from "./SystemCard";

export function SystemOverview({ mounted }: { mounted: boolean }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-2)]">
          System Overview
        </div>
        <div className="mt-1 text-2xl font-bold">Developer Workstation</div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-5 xl:grid-cols-4">
        {SYSTEM_STATS.map((item) => (
          <SystemCard key={item.label} mounted={mounted} {...item} />
        ))}
      </div>
    </section>
  );
}
