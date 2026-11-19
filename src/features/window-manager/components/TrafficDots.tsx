"use client";

import { Minus, Square, X } from "lucide-react";

interface TrafficDotProps {
  color: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export function TrafficDot({ color, label, icon, onClick }: TrafficDotProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="group flex h-3.5 w-3.5 items-center justify-center rounded-full border border-black/15 transition-all duration-150 hover:brightness-110"
      style={{ background: color }}
    >
      <span className="opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {icon}
      </span>
    </button>
  );
}

interface TrafficDotsProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

export function TrafficDots({
  onClose,
  onMinimize,
  onMaximize,
}: TrafficDotsProps) {
  return (
    <div className="flex gap-2">
      <TrafficDot
        color="#ff5f57"
        label="Close"
        icon={<X className="h-2.5 w-2.5 stroke-[3] text-black/70" />}
        onClick={onClose}
      />
      <TrafficDot
        color="#febc2e"
        label="Minimize"
        icon={<Minus className="h-2.5 w-2.5 stroke-[3] text-black/70" />}
        onClick={onMinimize}
      />
      <TrafficDot
        color="#28c840"
        label="Maximize"
        icon={<Square className="h-2 w-2 stroke-[3] text-black/70" />}
        onClick={onMaximize}
      />
    </div>
  );
}
