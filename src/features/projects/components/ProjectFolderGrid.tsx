"use client";

import type { Project } from "../types";

interface ProjectFolderGridProps {
  projects: Project[];
  onSelectProject: (name: string) => void;
}

export function ProjectFolderGrid({
  projects,
  onSelectProject,
}: ProjectFolderGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3.5">
      {projects.map((p) => (
        <button
          key={p.name}
          type="button"
          onClick={() => onSelectProject(p.name)}
          className="rounded-xl px-2 py-3.5 text-center transition hover:bg-white/[0.06]"
        >
          <div className="mb-2 text-[34px]">📁</div>
          <div className="text-xs font-semibold">{p.name}/</div>
        </button>
      ))}
    </div>
  );
}
