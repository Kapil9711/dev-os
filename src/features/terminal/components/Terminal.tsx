"use client";

import { useEffect, useRef } from "react";
import { useTerminal } from "../hooks/useTerminal";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalLine } from "./TerminalLine";
import { TerminalPrompt } from "./TerminalPrompt";

export function Terminal() {
  const {
    lines,
    input,
    setInput,
    typing,
    submitCommand,
    handleNavigateHistory,
  } = useTerminal();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div
      ref={scrollRef}
      className="term-scroll h-full overflow-y-auto bg-[#040816]/95 p-5 font-mono text-[13px] text-cyan-50 select-text"
    >
      <TerminalHeader />

      {lines.map((line, index) => (
        <TerminalLine
          key={line.id}
          line={line}
          isLast={index === lines.length - 1}
          typing={typing}
        />
      ))}

      <TerminalPrompt
        input={input}
        typing={typing}
        onInputChange={setInput}
        onSubmit={submitCommand}
        onNavigateHistory={handleNavigateHistory}
      />
    </div>
  );
}

export default Terminal;
