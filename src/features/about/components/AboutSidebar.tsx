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
    <div className="hidden w-[170px] shrink-0 border-r border-white/10 px-2 py-3 text-[12.5px] @3xl:block">
      <button
        type="button"
        onClick={() => onSelectTab("photo")}
        className="mb-2.5 flex w-full items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.06] p-2 text-left transition hover:bg-white/10"
      >
        <Image
          src={DEV.photo}
          alt={DEV.name}
          width={34}
          height={34}
          className="rounded-[9px] border border-white/10 object-cover"
        />
        <div>
          <div className="text-[11.5px] font-bold leading-tight">
            {DEV.name}
          </div>
          <div className="text-[10px] text-[var(--text-2)]">{DEV.role}</div>
        </div>
      </button>

      <div className="mb-1 mt-2 px-1.5 text-[10.5px] uppercase tracking-wide text-[var(--text-2)]">
        Explorer
      </div>
      {ABOUT_FILES.map((f) => (
        <button
          key={f.id}
          type="button"
          onClick={() => onSelectTab(f.id)}
          className={cn(
            "flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left",
            activeTab === f.id
              ? "bg-white/[0.06] text-[var(--text-1)]"
              : "text-[var(--text-2)]",
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
