"use client";

import { useEffect, useState, type RefObject } from "react";
import ProjectScene from "./ProjectScene";

// const ProjectsScene = dynamic(() => import("./ProjectScene"), { ssr: false });

interface ProjectsBackgroundProps {
  sectionRef: RefObject<HTMLElement | null>;
  activeIndex?: number;
  accents?: string[];
}

export default function ProjectsBackground({
  sectionRef,
  activeIndex,
  accents,
}: ProjectsBackgroundProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    setEnabled(!reduced && wide);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {enabled && (
        <ProjectScene
          sectionRef={sectionRef}
          activeIndex={activeIndex}
          accents={accents}
        />
      )}
    </div>
  );
}
