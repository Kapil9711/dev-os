"use client";

import type { Project } from "../types";

interface ProjectReadmeProps {
  project: Project;
}

export function ProjectReadme({ project }: ProjectReadmeProps) {
  return (
    <div className="text-[13px] leading-relaxed">
      <h2 className="mb-1.5 text-lg font-bold">{project.name}</h2>
      <div className="mb-3.5 text-[var(--text-2)]">{project.desc}</div>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px]"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
