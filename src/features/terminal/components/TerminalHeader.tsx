"use client";

import { DEV } from "@/constants/dev";

export function TerminalHeader() {
  return (
    <div className="mb-4 text-[var(--text-2)]">
      <div className="text-[15px] font-semibold">kapOS Terminal v3.0</div>
      <div className="mt-1">Welcome, {DEV.name}</div>
      <div>
        Type <span className="text-accent-2">help</span> to get started.
      </div>
    </div>
  );
}
