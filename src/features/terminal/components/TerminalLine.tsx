"use client";

import type { TerminalLineItem } from "../types";

interface TerminalLineProps {
  line: TerminalLineItem;
  isLast: boolean;
  typing: boolean;
}

export function TerminalLine({ line, isLast, typing }: TerminalLineProps) {
  switch (line.type) {
    case "input":
      return (
        <div className="mb-1.5 flex items-center gap-2 font-mono">
          <span className="font-bold text-cyan-400 drop-shadow-[0_0_6px_#00f0ff]">❯</span>
          <span className="text-sky-400">~/cyber</span>
          <span className="font-semibold text-cyan-100">{line.text}</span>
        </div>
      );

    case "error":
      return (
        <div className="mb-1.5 whitespace-pre-wrap rounded border border-rose-500/20 bg-rose-950/20 px-2 py-1 font-mono text-[12px] text-rose-300">
          {line.text}
        </div>
      );

    case "link":
      return (
        <div className="mb-1.5 font-mono">
          <a
            href={line.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 underline underline-offset-4 decoration-cyan-400/40 hover:text-cyan-100 hover:decoration-cyan-400"
          >
            {line.text} ↗
          </a>
        </div>
      );

    default:
      return (
        <div className="mb-1.5 whitespace-pre-wrap font-mono leading-relaxed text-slate-200">
          {line.text}
          {typing && isLast && (
            <span className="animate-pulse text-cyan-400 drop-shadow-[0_0_6px_#00f0ff]">
              ▋
            </span>
          )}
        </div>
      );
  }
}
