"use client";

import { useWindowManager } from "@/features/window-manager";
import { useClock } from "@/hooks/useClock";
import { cn } from "@/lib/utils";

export function MenuBar({ onOpenSpotlight }: { onOpenSpotlight: () => void }) {
  const time = useClock();
  const { hasMaximizedWindow } = useWindowManager();

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-40 h-10 items-center justify-between px-[18px] max-[720px]:hidden",
        hasMaximizedWindow ? "hidden" : "flex",
      )}
    >
      <div className="flex items-center gap-2 text-[13px] font-bold">
        <span className="h-2 w-2 rounded-full bg-gradient-to-br from-accent to-accent-2" />
        kapOS
      </div>
      <div className="flex items-center gap-4 text-[12.5px] text-[var(--text-2)]">
        <div className="glass-panel flex items-center gap-1.5 rounded-full px-2.5 py-1 transition hover:bg-white/10 hover:text-[var(--text-1)]">
          <span className="pulse-dot" /> Open to opportunities
        </div>
        <button
          type="button"
          onClick={onOpenSpotlight}
          className="glass-panel rounded-full px-2.5 py-1 transition hover:bg-white/10 hover:text-[var(--text-1)]"
        >
          ⌘K Search
        </button>
        <div className="glass-panel rounded-full px-2.5 py-1">
          {time ?? "--:--"}
        </div>
      </div>
    </div>
  );
}
