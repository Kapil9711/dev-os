"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DEV } from "@/constants/dev";
import { useWindowManager } from "@/features/window-manager/context/WindowManagerContext";
import type { AppId } from "@/constants/apps";

type LineType = "input" | "output" | "error" | "link";

interface Line {
  id: number;
  type: LineType;
  text: string;
  href?: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Terminal() {
  const { openWindow } = useWindowManager();

  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const history = useRef<string[]>([]);
  const historyIndex = useRef(-1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const idRef = useRef(0);

  const cwd = useMemo(() => "~/", []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight ?? 0;
  }, [lines]);

  function nextId() {
    idRef.current++;
    return idRef.current;
  }

  function pushLine(type: LineType, text: string, href?: string) {
    const id = nextId();

    setLines((prev) => [
      ...prev,
      {
        id,
        type,
        text,
        href,
      },
    ]);

    return id;
  }

  function updateLine(id: number, text: string) {
    setLines((prev) =>
      prev.map((line) =>
        line.id === id
          ? {
              ...line,
              text,
            }
          : line,
      ),
    );
  }

  async function type(text: string, type: LineType = "output", speed = 12) {
    setTyping(true);

    const id = pushLine(type, "");

    let current = "";

    for (const char of text) {
      current += char;

      updateLine(id, current);

      await sleep(speed);
    }

    setTyping(false);
  }

  function print(text: string) {
    pushLine("output", text);
  }

  function error(text: string) {
    pushLine("error", text);
  }

  function link(label: string, href: string) {
    pushLine("link", label, href);
  }

  function open(id: AppId, label: string) {
    openWindow(id);
    print(`Opening ${label}...`);
  }

  const files = {
    "about.md": `Hi, I'm ${DEV.name}.

I'm a Full Stack Software Engineer specializing in
Next.js, React Native, Node.js and TypeScript.`,

    "skills.md": DEV.stack.join("\n"),

    "resume.md": `Run the 'resume' command to open the resume window.`,

    "experience.md": `${DEV.experience}
Full Stack Software Engineer`,
  };
  async function run(command: string) {
    const cmd = command.trim();

    if (!cmd) return;

    // Print the command the user entered
    pushLine("input", cwd);

    const [name, ...args] = cmd.toLowerCase().split(" ");

    switch (name) {
      case "help":
        await type(`Available Commands

help           Show available commands
about          Open About window
experience     Open Experience window
resume         Open Resume window
skills         Show technical stack
whoami         Show developer information
pwd            Print current directory
ls             List available files
github         Open GitHub profile
linkedin       Open LinkedIn profile
email          Show email address
neofetch       Show system information
clear          Clear terminal`);
        break;

      case "clear":
        setLines([]);
        return;

      case "about":
        open("about", "About");
        break;

      case "experience":
        open("experience", "Experience");
        break;

      case "resume":
        open("resume", "Resume");
        break;

      case "skills":
        await type(DEV.stack.join("\n"));
        break;

      case "pwd":
        print(cwd);
        break;

      case "whoami":
        await type(`${DEV.name}
${DEV?.role}
${DEV.experience} Experience

${DEV?.summary ?? "Passionate Full Stack Software Engineer."}`);
        break;

      case "ls":
        print(Object.keys(files).join("    "));
        break;

      // case "cat": {
      //   if (!args.length) {
      //     error("Usage: cat <filename>");
      //     break;
      //   }

      //   const file = args.join(" ");

      //   if (!(file in files)) {
      //     error(`cat: ${file}: No such file`);
      //     break;
      //   }

      //   await type(files[file as keyof typeof files]);
      //   break;
      // }

      case "github":
        link(DEV.github, DEV.github);
        window.open(DEV.github, "_blank");
        break;

      case "linkedin":
        link(DEV.linkedin, DEV.linkedin);
        window.open(DEV.linkedin, "_blank");
        break;

      case "email":
        link(DEV.email, `mailto:${DEV.email}`);
        break;

      case "neofetch":
        await type(`█████████████████████████████

OS           kapOS 3.0
Host         ${DEV.name}
Role         ${DEV.role}
Experience   ${DEV.experience}
Runtime      Node.js
Editor       VS Code
Shell        zsh
Frontend     React, Next.js
Backend      Node.js, Express
Database     MongoDB
Language     TypeScript

█████████████████████████████`);
        break;

      default:
        error(
          `${name}: command not found

Type 'help' to see available commands.`,
        );
    }
  }

  return (
    <div
      ref={scrollRef}
      onClick={() => inputRef.current?.focus()}
      className="h-full overflow-y-auto bg-[#0b0f19] px-4 py-4 font-mono text-[13px]"
    >
      {/* Welcome */}
      <div className="mb-4 text-[var(--text-2)]">
        <div className="text-[15px] font-semibold">kapOS Terminal v3.0</div>

        <div className="mt-1">Welcome, {DEV.name}</div>

        <div>
          Type <span className="text-accent-2">help</span> to get started.
        </div>
      </div>

      {/* Output */}
      {lines.map((line, index) => {
        const isLast = index === lines.length - 1;

        switch (line.type) {
          case "input":
            return (
              <div key={line.id} className="mb-1">
                <span className="text-accent-3">➜</span>{" "}
                <span className="text-accent-2">~</span> {line.text}
              </div>
            );

          case "error":
            return (
              <div
                key={line.id}
                className="mb-1 whitespace-pre-wrap text-red-400"
              >
                {line.text}
              </div>
            );

          case "link":
            return (
              <div key={line.id} className="mb-1">
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
              <div key={line.id} className="mb-1 whitespace-pre-wrap">
                {line.text}

                {typing && isLast && <span className="animate-pulse">▋</span>}
              </div>
            );
        }
      })}

      {/* Prompt */}
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
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={async (e) => {
            if (typing) return;

            if (e.key === "ArrowUp") {
              e.preventDefault();

              if (!history.current.length) return;

              if (historyIndex.current < history.current.length - 1) {
                historyIndex.current++;
              }

              setInput(
                history.current[
                  history.current.length - 1 - historyIndex.current
                ] as any,
              );

              return;
            }

            if (e.key === "ArrowDown") {
              e.preventDefault();

              if (historyIndex.current <= 0) {
                historyIndex.current = -1;
                setInput("");
                return;
              }

              historyIndex.current--;

              setInput(
                history.current[
                  history.current.length - 1 - historyIndex.current
                ] as any,
              );

              return;
            }

            if (e.key !== "Enter") return;

            e.preventDefault();

            const cmd = input.trim();

            if (cmd) {
              history.current.push(cmd);
            }

            historyIndex.current = -1;

            setInput("");

            await run(cmd);

            requestAnimationFrame(() => {
              inputRef.current?.focus();
            });
          }}
        />

        {!typing && <span className="animate-pulse">▋</span>}
      </div>
    </div>
  );
}
