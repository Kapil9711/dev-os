"use client";

import { Minus, Square, X } from "lucide-react";

interface TrafficDotProps {
  color: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export function TrafficDot({
  color,
  label,
  icon,
  onClick,
  className,
}: TrafficDotProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`traffic-dot group relative flex h-3.5 w-3.5 items-center justify-center rounded-full border border-black/20 transition-all duration-150 hover:brightness-110 active:scale-90 ${className ?? ""}`}
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
    <div className="flex items-center gap-2">
      <TrafficDot
        color="var(--dot-close, #ff5f57)"
        label="Close"
        icon={<X className="h-2.5 w-2.5 stroke-[3] text-black/80" />}
        onClick={onClose}
      />
      <TrafficDot
        color="var(--dot-min, #febc2e)"
        label="Minimize"
        icon={<Minus className="h-2.5 w-2.5 stroke-[3] text-black/80" />}
        onClick={onMinimize}
      />
      <TrafficDot
        color="var(--dot-max, #28c840)"
        label="Maximize"
        icon={<Square className="h-2 w-2 stroke-[3] text-black/80" />}
        onClick={onMaximize}
      />
    </div>
  );
}
