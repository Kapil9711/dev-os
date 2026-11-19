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
        <div className="mb-1">
          <span className="text-accent-3">➜</span>{" "}
          <span className="text-accent-2">~</span> {line.text}
        </div>
      );

    case "error":
      return (
        <div className="mb-1 whitespace-pre-wrap text-red-400">
          {line.text}
        </div>
      );

    case "link":
      return (
        <div className="mb-1">
          <a
            href={line.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-2 underline underline-offset-4 hover:text-accent-3"
          >
            {line.text} ↗
          </a>
        </div>
      );

    default:
      return (
        <div className="mb-1 whitespace-pre-wrap">
          {line.text}
          {typing && isLast && <span className="animate-pulse">▋</span>}
        </div>
      );
  }
}
