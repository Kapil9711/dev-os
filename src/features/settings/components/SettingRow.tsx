"use client";

import { cn } from "@/lib/utils";

interface SettingRowProps {
  label: string;
  desc: string;
  children: React.ReactNode;
  last?: boolean;
}

export function SettingRow({
  label,
  desc,
  children,
  last = false,
}: SettingRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-3",
        !last && "border-b border-[var(--line)]",
      )}
    >
      <div>
        <div className="text-[13px] font-semibold">{label}</div>
        <div className="mt-0.5 text-[11.5px] text-[var(--text-2)]">{desc}</div>
      </div>
      {children}
    </div>
  );
}
