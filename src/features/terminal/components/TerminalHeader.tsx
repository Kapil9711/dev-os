"use client";

import { DEV } from "@/constants/dev";
import { Terminal as TerminalIcon } from "lucide-react";

export function TerminalHeader() {
  return (
    <div className="mb-4 rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3.5 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-cyan-500/15 pb-2">
        <div className="flex items-center gap-2 font-mono text-[13px] font-bold text-cyan-200">
          <TerminalIcon size={14} className="text-cyan-400" />
          <span>kapOS Netrunner CLI // v3.4</span>
        </div>
        <span className="font-mono text-[10px] text-cyan-400/60">[ONLINE // TLS 1.3]</span>
      </div>
      <div className="mt-2.5 text-[12.5px] leading-relaxed text-slate-300">
        Connected to <span className="font-semibold text-cyan-300">{DEV.name}&apos;s</span> virtual workstation.
      </div>
      <div className="mt-1 text-[11.5px] text-[var(--text-2)]">
        Type <span className="font-mono font-bold text-cyan-400">help</span> to list available commands (<span className="text-sky-300 font-mono">projects</span>, <span className="text-sky-300 font-mono">skills</span>, <span className="text-sky-300 font-mono">neofetch</span>).
      </div>
    </div>
  );
}
