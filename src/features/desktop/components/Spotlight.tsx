"use client";

import { useEffect, useMemo, useState } from "react";
import { DOCK_APPS, APP_REGISTRY, type AppId } from "@/constants/apps";
import { useWindowManager } from "@/features/window-manager/context/WindowManagerContext";
import { Search } from "lucide-react";

interface SpotlightProps {
  open: boolean;
  onClose: () => void;
}

const SEARCHABLE: AppId[] = [...DOCK_APPS];

export function Spotlight({ open, onClose }: SpotlightProps) {
  const { openWindow } = useWindowManager();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  const results = useMemo(
    () =>
      SEARCHABLE.filter((id) =>
        APP_REGISTRY[id].title.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  function runApp(id: AppId) {
    openWindow(id);
    onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          results.length === 0 ? 0 : (prev + 1) % results.length,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          results.length === 0
            ? 0
            : (prev - 1 + results.length) % results.length,
        );
        break;

      case "Enter":
        e.preventDefault();
        if (results[selectedIndex]) {
          runApp(results[selectedIndex]);
        }
        break;

      case "Escape":
        onClose();
        break;
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/65 pt-[14vh] backdrop-blur-sm select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-[min(560px,92vw)] overflow-hidden rounded-2xl border border-cyan-400/35 bg-[#030612]/95 shadow-[0_0_40px_rgba(0,240,255,0.25)] backdrop-blur-2xl">
        <div className="relative flex items-center border-b border-cyan-500/20 px-4">
          <Search size={18} className="text-cyan-400/80" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search apps, terminal commands, projects…"
            autoComplete="off"
            className="w-full bg-transparent px-3.5 py-4 font-mono text-[14.5px] text-cyan-100 placeholder-cyan-500/40 outline-none"
          />
          <kbd className="rounded border border-cyan-400/30 bg-cyan-950/40 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
            ESC
          </kbd>
        </div>

        <div className="max-h-[380px] overflow-y-auto p-2">
          {results.length === 0 && (
            <div className="px-4 py-5 text-center font-mono text-[12.5px] text-cyan-300/70">
              No matching modules — try <span className="text-cyan-400 font-bold">help</span> in Terminal
            </div>
          )}

          {results.map((id, index) => {
            const app = APP_REGISTRY[id];
            const Icon = app.icon;
            const isSelected = selectedIndex === index;

            return (
              <button
                key={id}
                type="button"
                onClick={() => runApp(id)}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-all duration-150 ${
                  isSelected
                    ? "border border-cyan-400/40 bg-cyan-500/20 text-cyan-100 shadow-[0_0_12px_rgba(0,240,255,0.18)]"
                    : "border border-transparent text-slate-300 hover:border-cyan-500/20 hover:bg-cyan-500/10 hover:text-cyan-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-950/40 text-cyan-300">
                    <Icon />
                  </div>
                  <span className="font-mono text-[13px] font-semibold">{app.title.split(" — ")[0]}</span>
                </div>

                <span className="font-mono text-[11px] text-cyan-400/60">
                  {isSelected ? "↵ Launch" : ""}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
