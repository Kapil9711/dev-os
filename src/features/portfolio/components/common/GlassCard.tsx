import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import clsx from "clsx";

type GlassCardProps = PropsWithChildren<
  ComponentPropsWithoutRef<"div"> & {
    className?: string;
  }
>;

export default function GlassCard({
  children,
  className,
  ...props
}: GlassCardProps) {
  return (
    <div
      {...props}
      className={clsx(
        "rounded-[28px]",
        "border border-white/10",
        "bg-white/[0.04]",
        "backdrop-blur-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
