"use client";

import type { Project } from "../types";
import { Folder } from "lucide-react";

interface ProjectFolderGridProps {
  projects: Project[];
  onSelectProject: (name: string) => void;
}

export function ProjectFolderGrid({
  projects,
  onSelectProject,
}: ProjectFolderGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3.5">
      {projects.map((p) => (
        <button
          key={p.name}
          type="button"
          onClick={() => onSelectProject(p.name)}
          className="group flex flex-col items-center rounded-xl border border-cyan-500/15 bg-cyan-950/15 p-4 text-center transition-all duration-200 hover:scale-[1.02] hover:border-cyan-400/40 hover:bg-cyan-950/35 hover:shadow-[0_0_15px_rgba(0,240,255,0.18)]"
        >
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-500/10 text-cyan-300 transition-colors group-hover:border-cyan-400 group-hover:text-cyan-100 group-hover:shadow-[0_0_10px_#00f0ff]">
            <Folder size={24} className="fill-cyan-400/20 text-cyan-400" />
          </div>
          <div className="font-mono text-xs font-semibold text-cyan-100 group-hover:text-cyan-200">
            {p.name}/
          </div>
        </button>
      ))}
    </div>
  );
}
