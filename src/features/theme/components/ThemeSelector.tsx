"use client";

import { Check, Cpu } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function ThemeSelector() {
  const { currentTheme } = useTheme();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-[#060c1c]/90 via-[#0a1226]/85 to-[#040714]/95 p-5 shadow-[0_0_25px_rgba(0,240,255,0.15)] backdrop-blur-xl">
      {/* Top HUD accent bar */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
            <Cpu size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-bold tracking-wide text-cyan-100">
                {currentTheme.name}
              </span>
              <span className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-cyan-300">
                ACTIVE
              </span>
            </div>
            <div className="text-[12px] text-cyan-300/70">
              {currentTheme.tagline}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
          <Check size={13} strokeWidth={2.5} />
          <span>Synchronized</span>
        </div>
      </div>

      {/* Description & Palette */}
      <p className="mt-3.5 text-[12.5px] leading-relaxed text-slate-300">
        {currentTheme.description}
      </p>

      {/* Live Color Swatches & Specs */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="flex items-center gap-2.5 rounded-xl border border-cyan-400/20 bg-cyan-950/20 p-2.5">
          <span className="h-3.5 w-3.5 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]" />
          <div>
            <div className="font-mono text-[10px] uppercase text-cyan-400">Cyan Ice</div>
            <div className="font-mono text-[11px] text-slate-300">#00F0FF</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-sky-400/20 bg-sky-950/20 p-2.5">
          <span className="h-3.5 w-3.5 rounded-full bg-[#00b4d8] shadow-[0_0_10px_#00b4d8]" />
          <div>
            <div className="font-mono text-[10px] uppercase text-sky-400">Electric Azure</div>
            <div className="font-mono text-[11px] text-slate-300">#00B4D8</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-blue-400/20 bg-blue-950/20 p-2.5">
          <span className="h-3.5 w-3.5 rounded-full bg-[#0077b6] shadow-[0_0_10px_#0077b6]" />
          <div>
            <div className="font-mono text-[10px] uppercase text-blue-400">Deep Cyber Blue</div>
            <div className="font-mono text-[11px] text-slate-300">#0077B6</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-400/20 bg-emerald-950/20 p-2.5">
          <span className="h-3.5 w-3.5 rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88]" />
          <div>
            <div className="font-mono text-[10px] uppercase text-emerald-400">Matrix Mint</div>
            <div className="font-mono text-[11px] text-slate-300">#00FF88</div>
          </div>
        </div>
      </div>
    </div>
  );
}
