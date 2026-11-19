"use client";

import { RECENT_ACTIVITY } from "../data/stats";

export function RecentActivity() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-2)]">
          Recent Activity
        </div>
        <div className="mt-1 text-xl font-bold">Engineering Timeline</div>
      </div>

      <div className="space-y-4 p-5">
        {RECENT_ACTIVITY.map((activity, index) => {
          const isLast = index === RECENT_ACTIVITY.length - 1;
          return (
            <div key={activity.title} className="relative flex gap-4">
              {!isLast && (
                <div className="absolute left-[11px] top-6 h-full w-px bg-white/10" />
              )}

              <div className="relative z-10 mt-1 h-6 w-6 rounded-full border border-cyan-400/30 bg-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,.35)]">
                <div className="absolute inset-1 animate-pulse rounded-full bg-cyan-400" />
              </div>

              <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:bg-white/[0.06]">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{activity.title}</div>
                  <span className="text-xs text-white/40">{activity.time}</span>
                </div>

                <div className="mt-2 text-sm text-white/50">
                  {activity.description ?? "Successfully completed and merged into the production workspace."}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
