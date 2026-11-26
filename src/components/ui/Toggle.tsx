"use client";

import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

/** Accessible on/off switch styled to match the Cyberpunk HUD aesthetic. */
export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-[44px] shrink-0 rounded-full border transition-all duration-200",
        checked
          ? "border-cyan-400 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-[0_0_12px_rgba(0,240,255,0.4)]"
          : "border-cyan-500/20 bg-cyan-950/40",
      )}
    >
      <span
        className={cn(
          "absolute top-[2px] h-[18px] w-[18px] rounded-full transition-all duration-200",
          checked
            ? "left-[21px] bg-black shadow-[0_0_6px_#00f0ff]"
            : "left-[3px] bg-cyan-400/60",
        )}
      />
    </button>
  );
}
