"use client";

interface ProjectBreadcrumbProps {
  crumbs: string[];
}

export function ProjectBreadcrumb({ crumbs }: ProjectBreadcrumbProps) {
  return (
    <div className="mb-4 flex items-center gap-2 font-mono text-xs text-[var(--text-2)]">
      {crumbs.map((c, i) => (
        <span
          key={c}
          className={i === crumbs.length - 1 ? "font-bold text-cyan-200" : "hover:text-cyan-300"}
        >
          {c}
          {i < crumbs.length - 1 && <span className="mx-1 text-cyan-400/50">/</span>}
        </span>
      ))}
    </div>
  );
}
