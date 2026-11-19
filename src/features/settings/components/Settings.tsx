"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/Toggle";
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
    document.documentElement.style.setProperty("--blur", on ? "18px" : "0px");
  }

  return (
    <div className="p-[18px]">
      <SettingRow
        label="Accent Color"
        desc="Applies across dock, focus rings, and highlights"
      >
        <div className="flex gap-2">
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              type="button"
              aria-label={`${a.id} accent`}
              onClick={() => applyAccent(a.id)}
              className={cn(
                "h-[26px] w-[26px] rounded-full border-2",
                accent === a.id ? "border-white" : "border-transparent",
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
        desc="Window transitions & dock magnification"
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
          className="rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-1.5 text-[12.5px] text-[var(--text-1)]"
        >
          <option>JetBrains Mono</option>
          <option>Menlo</option>
        </select>
      </SettingRow>
    </div>
  );
}

export default Settings;
