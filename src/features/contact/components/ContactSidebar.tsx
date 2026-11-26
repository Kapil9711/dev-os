"use client";

import { Github, Linkedin, Inbox, Send, Star } from "lucide-react";
import { DEV } from "@/constants/dev";

export function ContactSidebar() {
  return (
    <div className="w-[165px] shrink-0 border-r border-cyan-500/15 p-3.5 font-mono text-[12px] text-[var(--text-2)] select-none">
      <div className="space-y-1">
        <div className="flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-500/15 px-2.5 py-1.5 font-bold text-cyan-100 shadow-[0_0_10px_rgba(0,240,255,0.15)]">
          <Inbox size={13} className="text-cyan-400" />
          <span>Inbox</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-slate-400 transition hover:bg-cyan-500/10 hover:text-cyan-200">
          <Send size={13} className="text-cyan-400/60" />
          <span>Sent</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-slate-400 transition hover:bg-cyan-500/10 hover:text-cyan-200">
          <Star size={13} className="text-amber-400/70" />
          <span>Starred</span>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 px-1 font-mono text-[10px] uppercase tracking-widest text-cyan-400/70">
          {"// Connect"}
        </div>
        <div className="flex flex-col gap-2">
          <a
            href={DEV.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-950/20 px-3 py-2 text-[12px] text-cyan-200 transition hover:border-cyan-400/40 hover:bg-cyan-500/15 hover:text-cyan-100 hover:shadow-[0_0_10px_rgba(0,240,255,0.15)]"
          >
            <Github className="h-3.5 w-3.5 text-cyan-400" />
            <span>GitHub</span>
          </a>
          <a
            href={DEV.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-950/20 px-3 py-2 text-[12px] text-cyan-200 transition hover:border-cyan-400/40 hover:bg-cyan-500/15 hover:text-cyan-100 hover:shadow-[0_0_10px_rgba(0,240,255,0.15)]"
          >
            <Linkedin className="h-3.5 w-3.5 text-cyan-400" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
}
