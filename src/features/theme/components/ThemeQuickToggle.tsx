"use client";

import { Zap } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function ThemeQuickToggle() {
  const { currentTheme } = useTheme();

  return (
    <div
      title={`Active Environment: ${currentTheme.name} (Cyan Ice Luminance Glow)`}
      className="glass-panel flex items-center gap-1.5 rounded-full border-cyan-400/40 bg-cyan-950/30 px-3 py-1 text-xs text-cyan-300 shadow-[0_0_14px_rgba(0,240,255,0.25)] transition duration-200 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
    >
      <Zap size={12} className="shrink-0 fill-cyan-400/40 text-cyan-300 animate-pulse" />
      <span className="font-mono text-[11px] font-bold tracking-wider">
        CYBER_HUD <span className="text-cyan-400/60">{"//"}</span> ONLINE
      </span>
    </div>
  );
}
