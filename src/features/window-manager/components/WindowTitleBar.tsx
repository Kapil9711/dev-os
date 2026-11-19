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
      className="titlebar max-[720px]:hidden"
      style={{
        borderColor: "var(--line)",
        background: "rgba(255,255,255,0.02)",
      }}
      onPointerDown={onDragStart}
    >
      <TrafficDots
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
      />

      <div className="mr-[52px] flex flex-1 items-center justify-center gap-2 text-center text-[12.5px] font-semibold text-[var(--text-1)]">
        <span className="select-none text-[13px] opacity-80">
          <Icon />
        </span>
        {meta.title}
      </div>
    </div>
  );
}
