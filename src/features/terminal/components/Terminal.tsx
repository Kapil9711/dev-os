"use client";

import { useEffect, useRef, useState } from "react";
import { DEV } from "@/constants/dev";
import { useWindowManager } from "@/features/window-manager/context/WindowManagerContext";
import type { AppId } from "@/constants/apps";

interface Line {
  id: number;
  content: React.ReactNode;
}

const HELP_TEXT =
  "Commands: help · about · projects · skills · experience · resume · contact · github · linkedin · neofetch · clear";

export function Terminal() {
  const { openWindow } = useWindowManager();
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function print(content: React.ReactNode) {
    idRef.current += 1;
    setLines((prev) => [...prev, { id: idRef.current, content }]);
  }

  function openApp(id: AppId, label: string) {
    openWindow(id);
    print(<span className="text-[var(--text-2)]">Opening {label}…</span>);
  }

  function run(cmd: string) {
    print(
      <>
        <span className="text-accent-3">➜</span> <span className="text-accent-2">~</span> {cmd}
      </>,
    );
    switch (cmd.toLowerCase()) {
      case "":
        break;
      case "help":
        print(<span className="text-[var(--text-2)]">{HELP_TEXT}</span>);
        break;
      case "about":
        openApp("about", "About");
        break;
      case "projects":
        openApp("projects", "Projects");
        break;
      case "experience":
        openApp("experience", "Experience");
        break;
      case "resume":
        openApp("resume", "Resume");
        break;
      case "contact":
        openApp("contact", "Contact");
        break;
      case "skills":
        print(<span className="text-[var(--text-2)]">{DEV.stack.join(" · ")}</span>);
        break;
      case "github":
        print(<span className="text-[var(--text-2)]">{DEV.github} ↗</span>);
        break;
      case "linkedin":
        print(<span className="text-[var(--text-2)]">{DEV.linkedin} ↗</span>);
        break;
      case "clear":
        setLines([]);
        break;
      case "neofetch":
        print(
          <span className="whitespace-pre-wrap text-[var(--text-2)]">
            {`OS: vaibOS 2.6.0\nHost: ${DEV.name}\nUptime: ${DEV.experience} professional\nShell: zsh\nStack: ${DEV.stack.join(", ")}\nStatus: Available for work`}
          </span>,
        );
        break;
      default:
        print(
          <span className="text-[var(--text-2)]">
            [error] command not found: &quot;{cmd}&quot; — try &apos;help&apos;
          </span>,
        );
    }
  }

  return (
    <div
      ref={scrollRef}
      onClick={() => inputRef.current?.focus()}
      className="term-scroll h-full overflow-y-auto bg-[#0a0c14] px-4 py-3.5 text-[13px]"
    >
      <div className="mb-1 leading-[1.6] text-[var(--text-2)]">
        vaibOS terminal — type &apos;help&apos; to see available commands
      </div>
      {lines.map((l) => (
        <div key={l.id} className="mb-1 whitespace-pre-wrap break-words leading-[1.6]">
          {l.content}
        </div>
      ))}
      <div className="flex items-center gap-1.5">
        <span className="text-accent-3">➜</span>
        <span className="text-accent-2">~</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              run(value.trim());
              setValue("");
            }
          }}
          autoComplete="off"
          spellCheck={false}
          aria-label="Terminal command input"
          className="flex-1 bg-transparent font-mono text-[13px] text-[var(--text-1)] outline-none"
        />
      </div>
    </div>
  );
}
