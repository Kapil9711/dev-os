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
    <div className="mt-2 flex items-center gap-2">
      <span className="text-accent-3">➜</span>
      <span className="text-accent-2">~</span>

      <input
        ref={inputRef}
        value={input}
        disabled={typing}
        autoComplete="off"
        spellCheck={false}
        className="flex-1 bg-transparent outline-none"
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

      {!typing && <span className="animate-pulse">▋</span>}
    </div>
  );
}
