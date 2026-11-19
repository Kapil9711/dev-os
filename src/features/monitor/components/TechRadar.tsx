"use client";

import { STACK_USAGE } from "../data/stats";

export function TechRadar({ mounted }: { mounted: boolean }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-2)]">
          Tech Radar
        </div>
        <div className="mt-1 text-xl font-bold">Primary Skills</div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-5 lg:grid-cols-3">
        {STACK_USAGE.map(([name, level]) => (
          <div
            key={name}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:border-accent/50 hover:bg-white/[0.06]"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{name}</span>
              <span className="text-sm text-white/50">{level}%</span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-[1800ms]"
                style={{
                  width: mounted ? `${level}%` : "0%",
                }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-white/50">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
