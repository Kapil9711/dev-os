"use client";

import { useRef, useState } from "react";
import { DEV } from "@/constants/dev";
import { useWindowManager } from "@/features/window-manager/context/WindowManagerContext";
import type { AppId } from "@/constants/apps";
import type { LineType, TerminalLineItem } from "../types";
import { HELP_TEXT, NEOFETCH_BANNER, TERMINAL_FILES } from "../constants/commands";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useTerminal() {
  const { openWindow } = useWindowManager();

  const [lines, setLines] = useState<TerminalLineItem[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const history = useRef<string[]>([]);
  const historyIndex = useRef(-1);
  const idRef = useRef(0);
  const cwd = "~/";

  function nextId() {
    idRef.current++;
    return idRef.current;
  }

  function pushLine(type: LineType, text: string, href?: string) {
    const id = nextId();
    setLines((prev) => [...prev, { id, type, text, href }]);
    return id;
  }

  function updateLine(id: number, text: string) {
    setLines((prev) =>
      prev.map((line) => (line.id === id ? { ...line, text } : line)),
    );
  }

  async function typeWriter(text: string, type: LineType = "output", speed = 12) {
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

  async function run(command: string) {
    const cmd = command.trim();
    if (!cmd) return;

    pushLine("input", cwd);
    const [name] = cmd.toLowerCase().split(" ");

    switch (name) {
      case "help":
        await typeWriter(HELP_TEXT);
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
        await typeWriter(DEV.stack.join("\n"));
        break;

      case "pwd":
        print(cwd);
        break;

      case "whoami":
        await typeWriter(`${DEV.name}
${DEV?.role}
${DEV.experience} Experience

${DEV?.summary ?? "Passionate Full Stack Software Engineer."}`);
        break;

      case "ls":
        print(Object.keys(TERMINAL_FILES).join("    "));
        break;

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
        await typeWriter(NEOFETCH_BANNER);
        break;

      default:
        error(`${name}: command not found\n\nType 'help' to see available commands.`);
    }
  }

  function handleNavigateHistory(direction: "up" | "down") {
    if (direction === "up") {
      if (!history.current.length) return;
      if (historyIndex.current < history.current.length - 1) {
        historyIndex.current++;
      }
      setInput(
        history.current[history.current.length - 1 - historyIndex.current] ?? "",
      );
    } else {
      if (historyIndex.current <= 0) {
        historyIndex.current = -1;
        setInput("");
        return;
      }
      historyIndex.current--;
      setInput(
        history.current[history.current.length - 1 - historyIndex.current] ?? "",
      );
    }
  }

  function submitCommand(cmd: string) {
    if (cmd) {
      history.current.push(cmd);
    }
    historyIndex.current = -1;
    setInput("");
    return run(cmd);
  }

  return {
    lines,
    input,
    setInput,
    typing,
    cwd,
    run,
    submitCommand,
    handleNavigateHistory,
  };
}
