"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/Toggle";

const ACCENTS = [
  { id: "indigo", from: "#6C63FF", to: "#4C8DFF" },
  { id: "blue", from: "#4C8DFF", to: "#6C63FF" },
  { id: "violet", from: "#9B7EFF", to: "#6C63FF" },
] as const;

export function Settings() {
  const [accent, setAccent] = useState<(typeof ACCENTS)[number]["id"]>("indigo");
  const [animations, setAnimations] = useState(true);
  const [blur, setBlur] = useState(true);
  const [font, setFont] = useState("JetBrains Mono");

  function applyAccent(id: (typeof ACCENTS)[number]["id"]) {
    setAccent(id);
    const picked = ACCENTS.find((a) => a.id === id)!;
    document.documentElement.style.setProperty("--accent", picked.from);
    document.documentElement.style.setProperty("--accent-2", picked.to);
  }

  function applyBlur(on: boolean) {
    setBlur(on);
    document.documentElement.style.setProperty("--blur", on ? "18px" : "0px");
  }

  return (
    <div className="p-[18px]">
      <SettingRow label="Accent Color" desc="Applies across dock, focus rings, and highlights">
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
              style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}
            />
          ))}
        </div>
      </SettingRow>

      <SettingRow label="Animations" desc="Window transitions & dock magnification">
        <Toggle checked={animations} onChange={setAnimations} label="Toggle animations" />
      </SettingRow>

      <SettingRow label="Window Blur" desc="Glass backdrop blur intensity">
        <Toggle checked={blur} onChange={applyBlur} label="Toggle window blur" />
      </SettingRow>

      <SettingRow label="Terminal Font" desc="Monospace family used in Terminal & code views" last>
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

function SettingRow({
  label,
  desc,
  children,
  last,
}: {
  label: string;
  desc: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={cn("flex items-center justify-between py-3", !last && "border-b border-[var(--line)]")}>
      <div>
        <div className="text-[13px] font-semibold">{label}</div>
        <div className="mt-0.5 text-[11.5px] text-[var(--text-2)]">{desc}</div>
      </div>
      {children}
    </div>
  );
}
