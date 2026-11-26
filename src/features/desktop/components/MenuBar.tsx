"use client";

import { useWindowManager } from "@/features/window-manager";
import { ThemeQuickToggle } from "@/features/theme";
import { useClock } from "@/hooks/useClock";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export function MenuBar({ onOpenSpotlight }: { onOpenSpotlight: () => void }) {
  const time = useClock();
  const { hasMaximizedWindow } = useWindowManager();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 h-11 items-center justify-between border-b border-cyan-500/15 bg-[#030611]/70 px-5 backdrop-blur-xl max-[720px]:hidden select-none",
        hasMaximizedWindow ? "hidden" : "flex",
      )}
    >
      {/* Brand & System Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-[13px] font-bold tracking-wider text-cyan-100">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#0ea5e9] shadow-[0_0_8px_#00f0ff]" />
          </span>
          <span className="font-mono text-sm tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-sky-300">
            kapOS
          </span>
          <span className="rounded border border-cyan-400/25 bg-cyan-500/10 px-1.5 py-0.2 font-mono text-[9px] uppercase tracking-widest text-cyan-400">
            HUD v2.4
          </span>
        </div>
      </div>

      {/* Action Pills & Telemetry */}
      <div className="flex items-center gap-3 text-[12px] text-[var(--text-2)]">
        <div className="glass-panel flex items-center gap-2 rounded-full border-cyan-500/20 px-3 py-1 transition hover:border-cyan-400/40 hover:text-cyan-100">
          <span className="pulse-dot" />
          <span className="text-slate-200 font-medium">Open to opportunities</span>
        </div>

        <ThemeQuickToggle />

        <button
          type="button"
          onClick={onOpenSpotlight}
          className="glass-panel flex items-center gap-1.5 rounded-full border-cyan-500/20 px-3 py-1 font-mono text-cyan-200/90 transition hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-100 hover:shadow-[0_0_12px_rgba(0,240,255,0.25)]"
        >
          <Search size={12} className="text-cyan-400" />
          <span>⌘K Search</span>
        </button>

        <div className="glass-panel rounded-full border-cyan-500/20 px-3 py-1 font-mono font-semibold tracking-wider text-cyan-100 shadow-[0_0_10px_rgba(0,240,255,0.1)]">
          {time ?? "--:--"}
        </div>
      </div>
    </header>
  );
}
