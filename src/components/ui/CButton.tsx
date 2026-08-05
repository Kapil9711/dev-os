"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function CButton({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "group relative inline-flex overflow-hidden rounded-2xl p-[1px]",
        className,
      )}
    >
      {/* Rotating Border */}
      <span className="absolute inset-[-250%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,var(--accent),var(--accent-2),var(--accent-3),var(--accent))]" />

      {/* Glow */}
      <span className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-30" />

      {/* Button */}
      <span className="relative flex items-center justify-center gap-2 rounded-[15px] border border-[var(--line)] bg-[var(--glass)] px-6 py-3 text-sm font-semibold text-[var(--text-1)] backdrop-blur-xl transition-all duration-300 group-hover:bg-[var(--glass-strong)] group-hover:shadow-[0_0_35px_rgba(108,99,255,0.35)] group-active:scale-95">
        {children}
      </span>
    </button>
  );
}
