"use client";

import type { ExperienceEntry } from "../types";

interface ExperienceCommitNodeProps {
  role: ExperienceEntry;
}

export function ExperienceCommitNode({ role }: ExperienceCommitNodeProps) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className="h-2.5 w-2.5 rounded-full bg-accent-3"
          style={{ boxShadow: "0 0 8px #9b7eff" }}
        />
        <div className="mt-1 w-px flex-1 bg-[var(--line)]" />
      </div>
      <div className="pb-4">
        <div className="font-bold text-[var(--text-1)]">
          commit <span className="text-accent-2">{role.company}</span> —{" "}
          {role.title}
        </div>
        <div className="mt-0.5 text-[11px] text-[var(--text-2)]">
          {role.duration}
        </div>
        <div className="mt-1.5 max-w-[46ch] text-[var(--text-2)]">
          {role.summary}
        </div>
      </div>
    </div>
  );
}
