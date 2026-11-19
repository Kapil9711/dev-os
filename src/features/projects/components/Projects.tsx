"use client";

import { useState } from "react";
import { PROJECTS } from "../data/projects";
import { ProjectBreadcrumb } from "./ProjectBreadcrumb";
import { ProjectFileRow } from "./ProjectFileRow";
import { ProjectFolderGrid } from "./ProjectFolderGrid";
import { ProjectReadme } from "./ProjectReadme";

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
            <div className="rounded-md px-2 py-1.5 font-semibold text-[var(--text-1)]">
              📁 Projects
            </div>
            <div className="rounded-md px-2 py-1.5">⭐ Favorites</div>
            <div className="rounded-md px-2 py-1.5">🕓 Recent</div>
          </>
        )}
      </div>

      <div className="flex-1 overflow-auto p-[18px]">
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
            <div className="flex flex-col">
              <ProjectFileRow
                icon="📘"
                label="README.md"
                onClick={() => setShowReadme(true)}
              />
              <ProjectFileRow icon="📗" label="ARCHITECTURE.md" />
              <ProjectFileRow icon="🖼️" label="Gallery/" />
              <ProjectFileRow icon="▶️" label="Demo" trailing="↗" />
              <ProjectFileRow icon="🐙" label="Source" trailing="↗" />
            </div>
          </>
        )}

        {active && showReadme && <ProjectReadme project={active} />}
      </div>
    </div>
  );
}

export default Projects;
