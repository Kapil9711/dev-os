"use client";

import { SYSTEM_STATS } from "../data/stats";
import { SystemCard } from "./SystemCard";
import { Cpu } from "lucide-react";

export function SystemOverview({ mounted }: { mounted: boolean }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-950/20 to-[#040816]/70 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-cyan-500/15 px-6 py-4">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.25em] text-cyan-400/80">
            <Cpu size={12} className="text-cyan-400" />
            <span>Telemetry // Hardware</span>
          </div>
          <div className="mt-1 text-xl font-bold tracking-tight text-cyan-100">
            Developer Workstation
          </div>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-300">
          ALL_SYSTEMS_NOMINAL
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 p-5 xl:grid-cols-4">
        {SYSTEM_STATS.map((item) => (
          <SystemCard key={item.label} mounted={mounted} {...item} />
        ))}
      </div>
    </section>
  );
}
