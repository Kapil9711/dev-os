"use client";

import type { ProjectEntry } from "../types";

interface ExperienceBranchNodeProps {
  project: ProjectEntry;
  isLast: boolean;
}

export function ExperienceBranchNode({
  project,
  isLast,
}: ExperienceBranchNodeProps) {
  return (
    <div className="flex gap-3 pl-6">
      <div className="flex flex-col items-center">
        <div className="h-2 w-2 rounded-full bg-white/25" />
        {!isLast && <div className="mt-1 w-px flex-1 bg-[var(--line)]" />}
      </div>
      <div className={isLast ? "pb-2" : "pb-5"}>
        <div className="font-semibold text-[var(--text-1)]">
          <span className="text-accent-3">branch</span> {project.name}
        </div>
        <div className="mt-0.5 text-[11px] italic text-[var(--text-2)]">
          {project.summary}
        </div>
        {project.highlights.map((h) => (
          <div key={h} className="mt-1 text-success">
            + {h}
          </div>
        ))}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[10.5px] text-[var(--text-2)]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
