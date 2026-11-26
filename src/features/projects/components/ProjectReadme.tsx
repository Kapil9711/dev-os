"use client";

import type { Project } from "../types";

interface ProjectReadmeProps {
  project: Project;
}

export function ProjectReadme({ project }: ProjectReadmeProps) {
  return (
    <div className="rounded-xl border border-cyan-500/15 bg-cyan-950/15 p-5 text-[13px] leading-relaxed">
      <h2 className="mb-2 font-mono text-lg font-bold text-cyan-100">{project.name}</h2>
      <div className="mb-4 text-slate-300">{project.desc}</div>
      <div className="flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-cyan-400/25 bg-cyan-950/40 px-3 py-1 font-mono text-[11px] text-cyan-200 shadow-[0_0_8px_rgba(0,240,255,0.1)]"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
