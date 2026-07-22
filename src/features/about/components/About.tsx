"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DEV, SKILL_GROUPS } from "@/constants/dev";

import MarkdownFilePreview from "@/features/markdownPreview/components/MarkdownPreviewFile";

type Tab = "code" | "photo" | "skills" | "contact";

const FILES: { id: Tab; label: string }[] = [
  { id: "code", label: "📄 developer.md" },
  { id: "photo", label: "🖼️ profile.jpg" },
  { id: "skills", label: "📄 skills.ts" },
  { id: "contact", label: "📄 contact.ts" },
];

export function About() {
  const [tab, setTab] = useState<Tab>("code");

  return (
    <div className="flex h-full">
      <div className="w-[170px] shrink-0 border-r border-white/10 px-2 py-3 text-[12.5px]">
        <button
          type="button"
          onClick={() => setTab("photo")}
          className="mb-2.5 flex w-full items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.06] p-2 text-left transition hover:bg-white/10"
        >
          <Image
            src={DEV.photo}
            alt={DEV.name}
            width={34}
            height={34}
            className="rounded-[9px] border border-white/10 object-cover"
          />
          <div>
            <div className="text-[11.5px] font-bold leading-tight">
              {DEV.name}
            </div>
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
              tab === f.id
                ? "bg-white/[0.06] text-[var(--text-1)]"
                : "text-[var(--text-2)]",
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
  return <MarkdownFilePreview path="/docs/about.md" />;
}

function PhotoTab() {
  return (
    <div
      className="relative h-full overflow-y-auto overflow-x-hidden"
      style={{
        background:
          "repeating-conic-gradient(#0F1219 0% 25%, #0D0F16 0% 50%) center/18px 18px",
      }}
    >
      <div className="relative flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Ambient Glow */}
        <div className="absolute h-[420px] w-[420px] rounded-full bg-[#5B8CFF]/15 blur-[120px]" />

        <div className="relative flex w-full max-w-[520px] flex-col">
          {/* Accent Border */}
          <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-blue-400/30 via-indigo-400/10 to-cyan-400/20 blur-xl" />

          {/* Glass Card */}
          <div className="relative rounded-[28px] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-2xl">
            <Image
              src={DEV.photo}
              alt={DEV.name}
              width={700}
              height={900}
              priority
              className="mx-auto h-auto max-h-[50vh] w-auto max-w-full rounded-[22px] object-contain shadow-[0_30px_80px_rgba(0,0,0,.55)] sm:max-h-[58vh] md:max-h-[62vh] lg:max-h-[68vh] xl:max-h-[720px]"
            />
          </div>

          {/* Caption */}
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{DEV.name}</h3>

                <p className="mt-1 text-sm text-[var(--text-2)]">
                  Software Engineer
                </p>
              </div>

              <div className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-1 font-mono text-xs text-blue-300">
                profile.jpg
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillsTab() {
  return (
    <MarkdownFilePreview path="/docs/skills.md" />

    // <div className="p-5">
    //   <div className="mb-4 font-mono text-[11.5px] text-[var(--text-2)]">
    //     {"// same stack, rendered visually"}
    //   </div>
    //   {SKILL_GROUPS.map((g) => (
    //     <div key={g.group} className="mb-[18px]">
    //       <div className="mb-2 flex items-center gap-1.5 text-xs font-bold">
    //         {g.icon} {g.group}
    //       </div>
    //       <div className="flex flex-wrap gap-2">
    //         {g.items.map((s) => (
    //           <span
    //             key={s}
    //             className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs"
    //           >
    //             {s}
    //           </span>
    //         ))}
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}

function ContactTab() {
  return (
    <div className="p-4 px-5 font-mono text-[13px] leading-[1.85]">
      <div className="italic text-[#5b5e70]">{"// reach out"}</div>
      <div>
        <span className="text-accent-3">export const</span>{" "}
        <span className="text-accent-2">contact</span> ={" "}
        <span className="text-[var(--text-2)]">{"{"}</span>
      </div>
      <div className="pl-4">
        email: <span className="text-success">&quot;{DEV.email}&quot;</span>,
      </div>
      <div className="pl-4">
        github:{" "}
        <span className="text-success">
          &quot;{DEV.github.replace("https://", "")}&quot;
        </span>
        ,
      </div>
      <div className="pl-4">
        linkedin:{" "}
        <span className="text-success">
          &quot;{DEV.linkedin.replace("https://", "")}&quot;
        </span>
      </div>
      <div className="text-[var(--text-2)]">{"}"}</div>
    </div>
  );
}
