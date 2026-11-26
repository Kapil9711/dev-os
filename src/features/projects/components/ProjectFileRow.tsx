"use client";

interface ProjectFileRowProps {
  icon: string;
  label: string;
  trailing?: string;
  onClick?: () => void;
}

export function ProjectFileRow({
  icon,
  label,
  trailing,
  onClick,
}: ProjectFileRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className="flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-left font-mono text-[12.5px] text-slate-200 transition hover:border-cyan-500/20 hover:bg-cyan-500/10 hover:text-cyan-100 disabled:cursor-default"
    >
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
      {trailing && (
        <span className="ml-auto font-mono text-[11px] text-cyan-400/60">
          {trailing}
        </span>
      )}
    </button>
  );
}
