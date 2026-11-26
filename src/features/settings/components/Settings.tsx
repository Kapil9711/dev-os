"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/Toggle";
import { ThemeSelector } from "@/features/theme";
import { ACCENTS } from "../constants";
import type { AccentOption } from "../types";
import { SettingRow } from "./SettingRow";

export function Settings() {
  const [accent, setAccent] = useState<AccentOption["id"]>("indigo");
  const [animations, setAnimations] = useState(true);
  const [blur, setBlur] = useState(true);
  const [font, setFont] = useState("JetBrains Mono");

  function applyAccent(id: AccentOption["id"]) {
    setAccent(id);
    const picked = ACCENTS.find((a) => a.id === id);
    if (!picked) return;
    document.documentElement.style.setProperty("--accent", picked.from);
    document.documentElement.style.setProperty("--accent-2", picked.to);
  }

  function applyBlur(on: boolean) {
    setBlur(on);
    document.documentElement.style.setProperty("--blur", on ? "20px" : "0px");
  }

  return (
    <div className="p-6">
      <SettingRow
        label="System Theme"
        desc="Active aesthetic engine and telemetry palette"
        fullWidth
      >
        <ThemeSelector />
      </SettingRow>

      <SettingRow
        label="Accent Color"
        desc="Applies across dock, focus rings, and highlights"
      >
        <div className="flex gap-2.5">
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              type="button"
              aria-label={`${a.id} accent`}
              onClick={() => applyAccent(a.id)}
              className={cn(
                "h-7 w-7 rounded-full border-2 transition-transform duration-150 hover:scale-110",
                accent === a.id
                  ? "border-cyan-400 shadow-[0_0_10px_#00f0ff]"
                  : "border-transparent opacity-80 hover:opacity-100",
              )}
              style={{
                background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
              }}
            />
          ))}
        </div>
      </SettingRow>

      <SettingRow
        label="Animations"
        desc="Window transitions & dock magnification physics"
      >
        <Toggle
          checked={animations}
          onChange={setAnimations}
          label="Toggle animations"
        />
      </SettingRow>

      <SettingRow label="Window Blur" desc="Glass backdrop blur intensity">
        <Toggle
          checked={blur}
          onChange={applyBlur}
          label="Toggle window blur"
        />
      </SettingRow>

      <SettingRow
        label="Terminal Font"
        desc="Monospace family used in Terminal & code views"
        last
      >
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="rounded-lg border border-cyan-500/25 bg-[#030611]/80 px-3 py-1.5 font-mono text-[12.5px] text-cyan-100 outline-none transition focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,240,255,0.25)]"
        >
          <option>JetBrains Mono</option>
          <option>Menlo</option>
        </select>
      </SettingRow>
    </div>
  );
}

export default Settings;
