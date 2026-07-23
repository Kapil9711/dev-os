"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type RefObject } from "react";

const ProjectsScene = dynamic(() => import("./ProjectScene"), { ssr: false });

interface ProjectsBackgroundProps {
  sectionRef: RefObject<HTMLElement>;
}

export default function ProjectsBackground({
  sectionRef,
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
      {enabled && <ProjectsScene sectionRef={sectionRef} />}
    </div>
  );
}
