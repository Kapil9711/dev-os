"use client";

import { Github, Linkedin } from "lucide-react";
import { DEV } from "@/constants/dev";

export function ContactSidebar() {
  return (
    <div className="w-[150px] shrink-0 border-r border-white/10 px-2 py-3 text-[12.5px] text-[var(--text-2)]">
      <div className="mb-0.5 rounded-md bg-white/[0.06] px-2 py-2 text-[var(--text-1)]">
        📥 Inbox
      </div>
      <div className="mb-0.5 rounded-md px-2 py-2">📤 Sent</div>
      <div className="rounded-md px-2 py-2">⭐ Starred</div>

      <div className="mt-4 px-2">
        <div className="mb-2 text-[10.5px] uppercase tracking-wide text-[var(--text-2)]">
          Connect
        </div>
        <div className="flex flex-col gap-2">
          <a
            href={DEV.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-2 text-[12.5px] transition hover:bg-white/10"
          >
            <Github className="h-3.5 w-3.5" /> GitHub
          </a>
          <a
            href={DEV.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-2 text-[12.5px] transition hover:bg-white/10"
          >
            <Linkedin className="h-3.5 w-3.5" /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
