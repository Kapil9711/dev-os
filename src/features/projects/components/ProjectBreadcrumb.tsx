"use client";

interface ProjectBreadcrumbProps {
  crumbs: string[];
}

export function ProjectBreadcrumb({ crumbs }: ProjectBreadcrumbProps) {
  return (
    <div className="mb-3.5 flex items-center gap-1.5 text-xs text-[var(--text-2)]">
      {crumbs.map((c, i) => (
        <span
          key={c}
          className={i === crumbs.length - 1 ? "font-semibold text-[var(--text-1)]" : undefined}
        >
          {c}
          {i < crumbs.length - 1 && " /"}
        </span>
      ))}
    </div>
  );
}
