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
      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition hover:bg-white/[0.06] disabled:cursor-default"
    >
      <span>{icon}</span>
      <span>{label}</span>
      {trailing && (
        <span className="ml-auto text-[11px] text-[var(--text-2)]">
          {trailing}
        </span>
      )}
    </button>
  );
}
