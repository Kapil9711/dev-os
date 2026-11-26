"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { DEV } from "@/constants/dev";
import type { AboutTab, AboutExplorerItem } from "../types";

export const ABOUT_FILES: AboutExplorerItem[] = [
  { id: "code", label: "📄 developer.md" },
  { id: "photo", label: "🖼️ profile.jpg" },
  { id: "skills", label: "📄 skills.md" },
  { id: "contact", label: "📄 contact.ts" },
];

interface AboutSidebarProps {
  activeTab: AboutTab;
  onSelectTab: (tab: AboutTab) => void;
}

export function AboutSidebar({ activeTab, onSelectTab }: AboutSidebarProps) {
  return (
    <div className="hidden w-[180px] shrink-0 border-r border-cyan-500/15 p-3 text-[12.5px] @3xl:block select-none">
      <button
        type="button"
        onClick={() => onSelectTab("photo")}
        className="mb-3 flex w-full items-center gap-2.5 rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-2 text-left transition hover:border-cyan-400/40 hover:bg-cyan-950/40 hover:shadow-[0_0_12px_rgba(0,240,255,0.15)]"
      >
        <Image
          src={DEV.photo}
          alt={DEV.name}
          width={36}
          height={36}
          className="rounded-lg border border-cyan-400/30 object-cover shadow-[0_0_8px_rgba(0,240,255,0.2)]"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12px] font-bold text-cyan-100">
            {DEV.name}
          </div>
          <div className="truncate font-mono text-[10px] text-cyan-400/70">{DEV.role}</div>
        </div>
      </button>

      <div className="mb-1.5 px-2 font-mono text-[10px] uppercase tracking-widest text-cyan-400/60">
        {"// Explorer"}
      </div>
      <div className="space-y-1">
        {ABOUT_FILES.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onSelectTab(f.id)}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 font-mono text-[11.5px] transition-all duration-150",
              activeTab === f.id
                ? "border border-cyan-400/40 bg-cyan-500/15 font-semibold text-cyan-100 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                : "border border-transparent text-slate-400 hover:border-cyan-500/20 hover:bg-cyan-500/10 hover:text-cyan-200",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
