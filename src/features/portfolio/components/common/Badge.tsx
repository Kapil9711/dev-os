import { PropsWithChildren } from "react";
import clsx from "clsx";

type BadgeProps = PropsWithChildren<{
  className?: string;
}>;

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center",
        "rounded-full",
        "border border-white/10",
        "bg-white/5",
        "px-3 py-1",
        "text-xs",
        "font-medium",
        "text-white/80",
        className,
      )}
    >
      {children}
    </span>
  );
}
