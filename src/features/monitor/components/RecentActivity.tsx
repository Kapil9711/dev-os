"use client";

import { RECENT_ACTIVITY } from "../data/stats";
import { GitCommit } from "lucide-react";

export function RecentActivity() {
  return (
    <section className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-950/20 to-[#040816]/70 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="border-b border-cyan-500/15 px-6 py-4">
        <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.25em] text-cyan-400/80">
          <GitCommit size={12} className="text-cyan-400" />
          <span>Activity Log // Deployment Stream</span>
        </div>
        <div className="mt-1 text-xl font-bold tracking-tight text-cyan-100">
          Engineering Timeline
        </div>
      </div>

      <div className="space-y-3.5 p-5">
        {RECENT_ACTIVITY.map((activity, index) => {
          const isLast = index === RECENT_ACTIVITY.length - 1;
          return (
            <div key={activity.title} className="relative flex gap-4">
              {!isLast && (
                <div className="absolute left-[11px] top-7 h-full w-px bg-cyan-500/20" />
              )}

              <div className="relative z-10 mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-950/80 shadow-[0_0_12px_rgba(0,240,255,0.35)]">
                <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]" />
              </div>

              <div className="flex-1 rounded-xl border border-cyan-500/15 bg-[#030612]/70 p-4 transition-all duration-200 hover:border-cyan-400/35 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[13px] font-semibold text-cyan-100">{activity.title}</div>
                  <span className="font-mono text-[11px] text-cyan-400/70">{activity.time}</span>
                </div>

                <div className="mt-1.5 text-[12.5px] leading-relaxed text-slate-300">
                  {activity.description ?? "Successfully validated and deployed to active cluster."}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
