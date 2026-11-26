"use client";

import { useState } from "react";
import { PROJECTS } from "../data/projects";
import { ProjectBreadcrumb } from "./ProjectBreadcrumb";
import { ProjectFileRow } from "./ProjectFileRow";
import { ProjectFolderGrid } from "./ProjectFolderGrid";
import { ProjectReadme } from "./ProjectReadme";
import { ArrowLeft, Folder, Star, Clock } from "lucide-react";

export function Projects() {
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [showReadme, setShowReadme] = useState(false);

  const active = PROJECTS.find((p) => p.name === openProject) ?? null;

  return (
    <div className="flex h-full select-none">
      <div className="w-[160px] shrink-0 border-r border-cyan-500/15 p-3 font-mono text-[12px] text-[var(--text-2)]">
        {active ? (
          <button
            type="button"
            className="flex w-full items-center gap-1.5 rounded-lg border border-cyan-500/25 bg-cyan-950/25 px-2.5 py-1.5 text-cyan-200 transition hover:border-cyan-400 hover:bg-cyan-500/15 hover:text-cyan-100"
            onClick={() => {
              setOpenProject(null);
              setShowReadme(false);
            }}
          >
            <ArrowLeft size={13} />
            <span>Back</span>
          </button>
        ) : (
          <div className="space-y-1">
            <div className="flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-500/15 px-2.5 py-1.5 font-bold text-cyan-100 shadow-[0_0_10px_rgba(0,240,255,0.15)]">
              <Folder size={13} className="text-cyan-400 fill-cyan-400/20" />
              <span>Projects</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-slate-400 transition hover:bg-cyan-500/10 hover:text-cyan-200">
              <Star size={13} className="text-amber-400/70" />
              <span>Favorites</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-slate-400 transition hover:bg-cyan-500/10 hover:text-cyan-200">
              <Clock size={13} className="text-cyan-400/60" />
              <span>Recent</span>
            </div>
          </div>
        )}
      </div>

      <div className="wbody-scroll flex-1 overflow-auto p-5">
        {!active && (
          <>
            <ProjectBreadcrumb crumbs={["Projects"]} />
            <ProjectFolderGrid
              projects={PROJECTS}
              onSelectProject={setOpenProject}
            />
          </>
        )}

        {active && !showReadme && (
          <>
            <ProjectBreadcrumb crumbs={["Projects", active.name]} />
            <div className="space-y-1">
              <ProjectFileRow
                icon="📘"
                label="README.md"
                onClick={() => setShowReadme(true)}
              />
              <ProjectFileRow icon="📗" label="ARCHITECTURE.md" />
              <ProjectFileRow icon="🖼️" label="Gallery/" />
              <ProjectFileRow icon="▶️" label="Live Demonstration" trailing="DEPLOYED" />
              <ProjectFileRow icon="🐙" label="Source Repository" trailing="GITHUB ↗" />
            </div>
          </>
        )}

        {active && showReadme && <ProjectReadme project={active} />}
      </div>
    </div>
  );
}

export default Projects;
