"use client";

import type { AppMeta } from "@/constants/apps";
import { TrafficDots } from "./TrafficDots";

interface WindowTitleBarProps {
  meta: AppMeta;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onDragStart: (e: React.PointerEvent) => void;
}

export function WindowTitleBar({
  meta,
  onClose,
  onMinimize,
  onMaximize,
  onDragStart,
}: WindowTitleBarProps) {
  const Icon = meta.icon;

  return (
    <div
      className="titlebar max-[720px]:hidden select-none"
      onPointerDown={onDragStart}
    >
      <TrafficDots
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
      />

      <div className="flex flex-1 items-center justify-center gap-2 text-center">
        <span className="text-cyan-400 opacity-90 drop-shadow-[0_0_6px_rgba(0,240,255,0.4)]">
          <Icon />
        </span>
        <span className="font-mono text-[12.5px] font-semibold tracking-wide text-cyan-100">
          {meta.title}
        </span>
      </div>

      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan-400/50">
        <span className="hidden sm:inline">CYBER_SYS</span>
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
      </div>
    </div>
  );
}
