"use client";

import { useEffect, useMemo, useState } from "react";
import { DOCK_APPS, APP_REGISTRY, type AppId } from "@/constants/apps";
import { useWindowManager } from "@/features/window-manager/context/WindowManagerContext";

interface SpotlightProps {
  open: boolean;
  onClose: () => void;
}

const SEARCHABLE: AppId[] = [...DOCK_APPS, "settings"];

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
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/55 pt-[14vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-[min(560px,90vw)] overflow-hidden rounded-2xl border border-white/10 bg-[rgba(17,20,32,0.92)] shadow-2xl backdrop-blur-xl">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search apps, projects, skills…"
          autoComplete="off"
          className="w-full border-b border-white/10 bg-transparent px-[18px] py-4 text-base text-[var(--text-1)] outline-none"
        />

        <div className="max-h-[420px] overflow-y-auto py-1">
          {results.length === 0 && (
            <div className="px-[18px] py-3 text-[13px] text-[var(--text-2)]">
              No results — try <span className="font-medium">help</span> in
              Terminal
            </div>
          )}

          {results.map((id, index) => (
            <button
              key={id}
              type="button"
              onClick={() => runApp(id)}
              className={`flex w-full items-center justify-between px-[18px] py-3 text-left text-[13px] transition ${
                selectedIndex === index
                  ? "bg-white/10"
                  : "hover:bg-white/[0.06]"
              }`}
            >
              <span>{APP_REGISTRY[id].title.split(" — ")[0]}</span>

              <span className="text-[11px] text-[var(--text-2)]">↩ Open</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
