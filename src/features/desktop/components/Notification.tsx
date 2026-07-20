"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Notification() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setShow(true), 2600);
    const hideTimer = setTimeout(() => setShow(false), 8000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      className={cn(
        "glass-panel fixed right-5 top-[52px] z-[60] w-[300px] rounded-2xl bg-[var(--glass-strong)] p-3.5 px-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-400 ease-[cubic-bezier(0.2,0.9,0.3,1.1)]",
        show ? "translate-x-0 opacity-100" : "translate-x-[360px] opacity-0",
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 text-[12.5px] font-bold">
        👋 Welcome, Recruiter
      </div>
      <div className="mt-1 text-xs text-[var(--text-2)]">
        Type <b>help</b> in the Terminal to explore the system.
      </div>
    </div>
  );
}
