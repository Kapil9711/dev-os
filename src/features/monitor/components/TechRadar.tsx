"use client";

import { STACK_USAGE } from "../data/stats";
import { Radar } from "lucide-react";

export function TechRadar({ mounted }: { mounted: boolean }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-950/20 to-[#040816]/70 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-cyan-500/15 px-6 py-4">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.25em] text-cyan-400/80">
            <Radar size={12} className="text-cyan-400" />
            <span>Tech Radar // Core Stack</span>
          </div>
          <div className="mt-1 text-xl font-bold tracking-tight text-cyan-100">
            Primary Competencies
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-5 lg:grid-cols-3">
        {STACK_USAGE.map(([name, level]) => (
          <div
            key={name}
            className="group rounded-xl border border-cyan-500/15 bg-[#030612]/70 p-4 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(0,240,255,0.12)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[13px] font-semibold text-cyan-100">{name}</span>
              <span className="font-mono text-xs text-cyan-400">{level}%</span>
            </div>

            <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-cyan-950/60 border border-cyan-500/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#00f0ff] via-[#00b4d8] to-[#0077b6] shadow-[0_0_8px_#00f0ff] transition-all duration-[1600ms]"
                style={{
                  width: mounted ? `${level}%` : "0%",
                }}
              />
            </div>

            <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] text-slate-400">
              <span>Novice</span>
              <span>Advanced</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
