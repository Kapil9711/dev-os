"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DEV, SKILL_GROUPS } from "@/constants/dev";

type Tab = "code" | "photo" | "skills" | "contact";

const FILES: { id: Tab; label: string }[] = [
  { id: "code", label: "📄 developer.ts" },
  { id: "photo", label: "🖼️ profile.jpg" },
  { id: "skills", label: "📄 skills.ts" },
  { id: "contact", label: "📄 contact.ts" },
];

export function About() {
  const [tab, setTab] = useState<Tab>("code");

  return (
    <div className="flex h-full bg-[#0d1017]">
      <div className="w-[170px] shrink-0 border-r border-white/10 px-2 py-3 text-[12.5px]">
        <button
          type="button"
          onClick={() => setTab("photo")}
          className="mb-2.5 flex w-full items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.06] p-2 text-left transition hover:bg-white/10"
        >
          <Image src={DEV.photo} alt={DEV.name} width={34} height={34} className="rounded-[9px] border border-white/10 object-cover" />
          <div>
            <div className="text-[11.5px] font-bold leading-tight">{DEV.name}</div>
            <div className="text-[10px] text-[var(--text-2)]">{DEV.role}</div>
          </div>
        </button>

        <div className="mb-1 mt-2 px-1.5 text-[10.5px] uppercase tracking-wide text-[var(--text-2)]">
          Explorer
        </div>
        {FILES.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setTab(f.id)}
            className={cn(
              "flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left",
              tab === f.id ? "bg-white/[0.06] text-[var(--text-1)]" : "text-[var(--text-2)]",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto">
        {tab === "code" && <CodeTab />}
        {tab === "photo" && <PhotoTab />}
        {tab === "skills" && <SkillsTab />}
        {tab === "contact" && <ContactTab />}
      </div>
    </div>
  );
}

function CodeTab() {
  return (
    <div className="p-4 px-5 font-mono text-[13px] leading-[1.85]">
      <div className="italic text-[#5b5e70]">{"// about me"}</div>
      <div>
        <span className="text-accent-3">const</span> <span className="text-accent-2">developer</span> ={" "}
        <span className="text-[var(--text-2)]">{"{"}</span>
      </div>
      <div className="pl-4">
        name: <span className="text-success">&quot;{DEV.name}&quot;</span>,
      </div>
      <div className="pl-4">
        role: <span className="text-success">&quot;{DEV.role}&quot;</span>,
      </div>
      <div className="pl-4">
        experience: <span className="text-success">&quot;{DEV.experience}&quot;</span>,
      </div>
      <div className="pl-4">
        stack: <span className="text-[var(--text-2)]">[</span>
      </div>
      {DEV.stack.map((s) => (
        <div key={s} className="pl-8">
          <span className="text-success">&quot;{s}&quot;</span>,
        </div>
      ))}
      <div className="pl-4 text-[var(--text-2)]">],</div>
      <div className="pl-4">
        focus: <span className="text-success">&quot;end-to-end ownership, performance, clean docs&quot;</span>
      </div>
      <div className="text-[var(--text-2)]">{"}"}</div>
    </div>
  );
}

function PhotoTab() {
  return (
    <div
      className="flex h-full flex-col items-center justify-center p-6"
      style={{
        background:
          "repeating-conic-gradient(#0F1219 0% 25%, #0D0F16 0% 50%) 0 0/16px 16px",
      }}
    >
      <Image
        src={DEV.photo}
        alt={DEV.name}
        width={220}
        height={220}
        className="max-h-[78%] rounded-xl border border-white/10 object-cover shadow-2xl"
      />
      <div className="mt-3.5 font-mono text-[11.5px] text-[var(--text-2)]">
        profile.svg · {DEV.name}
      </div>
    </div>
  );
}

function SkillsTab() {
  return (
    <div className="p-5">
      <div className="mb-4 font-mono text-[11.5px] text-[var(--text-2)]">
        {"// same stack, rendered visually"}
      </div>
      {SKILL_GROUPS.map((g) => (
        <div key={g.group} className="mb-[18px]">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-bold">
            {g.icon} {g.group}
          </div>
          <div className="flex flex-wrap gap-2">
            {g.items.map((s) => (
              <span key={s} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs">
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactTab() {
  return (
    <div className="p-4 px-5 font-mono text-[13px] leading-[1.85]">
      <div className="italic text-[#5b5e70]">{"// reach out"}</div>
      <div>
        <span className="text-accent-3">export const</span> <span className="text-accent-2">contact</span> ={" "}
        <span className="text-[var(--text-2)]">{"{"}</span>
      </div>
      <div className="pl-4">
        email: <span className="text-success">&quot;{DEV.email}&quot;</span>,
      </div>
      <div className="pl-4">
        github: <span className="text-success">&quot;{DEV.github.replace("https://", "")}&quot;</span>,
      </div>
      <div className="pl-4">
        linkedin: <span className="text-success">&quot;{DEV.linkedin.replace("https://", "")}&quot;</span>
      </div>
      <div className="text-[var(--text-2)]">{"}"}</div>
    </div>
  );
}
