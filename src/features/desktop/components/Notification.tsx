"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";

export function Notification() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setShow(true), 2600);
    const hideTimer = setTimeout(() => setShow(false), 9000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      className={cn(
        "glass-panel fixed right-6 top-[58px] z-[60] w-[310px] rounded-2xl border-cyan-400/35 bg-[#030612]/90 p-4 shadow-[0_0_25px_rgba(0,240,255,0.22)] backdrop-blur-xl transition-all duration-400 ease-[cubic-bezier(0.2,0.9,0.3,1.1)] select-none",
        show ? "translate-x-0 opacity-100" : "translate-x-[360px] opacity-0",
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 text-[13px] font-bold text-cyan-100">
        <Bell size={14} className="text-cyan-400 fill-cyan-400/20" />
        <span>Welcome to kapOS HUD</span>
      </div>
      <div className="mt-1.5 text-[12px] leading-relaxed text-slate-300">
        Type <span className="font-mono font-bold text-cyan-400">help</span> in the Terminal or press <span className="font-mono text-cyan-300">⌘K</span> to discover modules.
      </div>
    </div>
  );
}
