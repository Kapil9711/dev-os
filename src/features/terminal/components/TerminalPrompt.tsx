"use client";

import { useEffect, useRef } from "react";

interface TerminalPromptProps {
  input: string;
  typing: boolean;
  onInputChange: (val: string) => void;
  onSubmit: (cmd: string) => void;
  onNavigateHistory: (direction: "up" | "down") => void;
}

export function TerminalPrompt({
  input,
  typing,
  onInputChange,
  onSubmit,
  onNavigateHistory,
}: TerminalPromptProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="mt-3 flex items-center gap-2 font-mono">
      <span className="font-bold text-cyan-400 drop-shadow-[0_0_6px_#00f0ff]">❯</span>
      <span className="text-sky-400">~/cyber</span>

      <input
        ref={inputRef}
        value={input}
        disabled={typing}
        autoComplete="off"
        spellCheck={false}
        className="flex-1 bg-transparent font-mono text-cyan-100 outline-none placeholder-cyan-500/40"
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (typing) return;

          if (e.key === "ArrowUp") {
            e.preventDefault();
            onNavigateHistory("up");
            return;
          }

          if (e.key === "ArrowDown") {
            e.preventDefault();
            onNavigateHistory("down");
            return;
          }

          if (e.key !== "Enter") return;

          e.preventDefault();
          onSubmit(input.trim());

          requestAnimationFrame(() => {
            inputRef.current?.focus();
          });
        }}
      />

      {!typing && (
        <span className="animate-pulse text-cyan-400 drop-shadow-[0_0_6px_#00f0ff]">
          ▋
        </span>
      )}
    </div>
  );
}
