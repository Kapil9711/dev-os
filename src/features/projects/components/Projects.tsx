"use client";

import { useState } from "react";
import { PROJECTS } from "../data/projects";

export function Projects() {
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [showReadme, setShowReadme] = useState(false);

  const active = PROJECTS.find((p) => p.name === openProject) ?? null;

  return (
    <div className="flex h-full">
      <div className="w-[150px] shrink-0 border-r border-white/10 px-2 py-3 text-[12.5px] text-[var(--text-2)]">
        {active ? (
          <button
            type="button"
            className="rounded-md px-2 py-1.5"
            onClick={() => {
              setOpenProject(null);
              setShowReadme(false);
            }}
          >
            ← Back
          </button>
        ) : (
          <>
            <div className="rounded-md px-2 py-1.5 font-semibold text-[var(--text-1)]">📁 Projects</div>
            <div className="rounded-md px-2 py-1.5">⭐ Favorites</div>
            <div className="rounded-md px-2 py-1.5">🕓 Recent</div>
          </>
        )}
      </div>

      <div className="flex-1 overflow-auto p-[18px]">
        {!active && (
          <>
            <Breadcrumb crumbs={["Projects"]} />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3.5">
              {PROJECTS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setOpenProject(p.name)}
                  className="rounded-xl px-2 py-3.5 text-center transition hover:bg-white/[0.06]"
                >
                  <div className="mb-2 text-[34px]">📁</div>
                  <div className="text-xs font-semibold">{p.name}/</div>
                </button>
              ))}
            </div>
          </>
        )}

        {active && !showReadme && (
          <>
            <Breadcrumb crumbs={["Projects", active.name]} />
            <div className="flex flex-col">
              <FileRow icon="📘" label="README.md" onClick={() => setShowReadme(true)} />
              <FileRow icon="📗" label="ARCHITECTURE.md" />
              <FileRow icon="🖼️" label="Gallery/" />
              <FileRow icon="▶️" label="Demo" trailing="↗" />
              <FileRow icon="🐙" label="Source" trailing="↗" />
            </div>
          </>
        )}

        {active && showReadme && (
          <div className="text-[13px] leading-relaxed">
            <h2 className="mb-1.5 text-lg font-bold">{active.name}</h2>
            <div className="mb-3.5 text-[var(--text-2)]">{active.desc}</div>
            <div className="flex flex-wrap gap-1.5">
              {active.stack.map((s) => (
                <span key={s} className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Breadcrumb({ crumbs }: { crumbs: string[] }) {
  return (
    <div className="mb-3.5 flex items-center gap-1.5 text-xs text-[var(--text-2)]">
      {crumbs.map((c, i) => (
        <span key={c} className={i === crumbs.length - 1 ? "font-semibold text-[var(--text-1)]" : undefined}>
          {c}
          {i < crumbs.length - 1 && " /"}
        </span>
      ))}
    </div>
  );
}

function FileRow({ icon, label, trailing, onClick }: { icon: string; label: string; trailing?: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition hover:bg-white/[0.06] disabled:cursor-default"
    >
      <span>{icon}</span>
      <span>{label}</span>
      {trailing && <span className="ml-auto text-[11px] text-[var(--text-2)]">{trailing}</span>}
    </button>
  );
}
