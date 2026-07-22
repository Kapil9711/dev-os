import { PropsWithChildren } from "react";
import clsx from "clsx";

type ChipProps = PropsWithChildren<{
  className?: string;
}>;

export default function Chip({ children, className }: ChipProps) {
  return (
    <div
      className={clsx(
        "inline-flex items-center",
        "rounded-full",
        "border border-white/10",
        "bg-white/[0.06]",
        "px-4 py-2",
        "text-sm",
        "text-white/90",
        "transition-all duration-300",
        "hover:border-blue-400/40",
        "hover:bg-white/10",
        className,
      )}
    >
      {children}
    </div>
  );
}
