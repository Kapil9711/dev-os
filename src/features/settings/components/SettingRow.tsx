"use client";

import { cn } from "@/lib/utils";

interface SettingRowProps {
  label: string;
  desc: string;
  children: React.ReactNode;
  last?: boolean;
  fullWidth?: boolean;
}

export function SettingRow({
  label,
  desc,
  children,
  last = false,
  fullWidth = false,
}: SettingRowProps) {
  if (fullWidth) {
    return (
      <div
        className={cn(
          "py-4",
          !last && "border-b border-cyan-500/15",
        )}
      >
        <div className="mb-3">
          <div className="text-[13px] font-semibold text-cyan-100">{label}</div>
          <div className="mt-0.5 text-[11.5px] text-[var(--text-2)]">{desc}</div>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between py-4",
        !last && "border-b border-cyan-500/15",
      )}
    >
      <div className="pr-4">
        <div className="text-[13px] font-semibold text-cyan-100">{label}</div>
        <div className="mt-0.5 text-[11.5px] text-[var(--text-2)]">{desc}</div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
