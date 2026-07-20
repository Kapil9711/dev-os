"use client";

import { useWindowManager } from "@/features/window-manager";
import { useClock } from "@/hooks/useClock";
import { cn } from "@/lib/utils";

export function MobileStatusBar() {
  const time = useClock();
  const { hasMaximizedWindow } = useWindowManager();
  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-[55] hidden h-[34px] items-center justify-between px-[18px] text-xs font-semibold text-[var(--text-1)]",
        hasMaximizedWindow ? "hidden" : "max-[720px]:flex",
      )}
    >
      <div>{time ?? "--:--"}</div>
      <div className="flex items-center gap-1.5 text-xs opacity-90">
        📶 📡 🔋
      </div>
    </div>
  );
}
