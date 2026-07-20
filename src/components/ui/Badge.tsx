import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "default" | "accent";
}

/** Small pill used for tags, tech stack chips, and status labels. */
export function Badge({ tone = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium",
        tone === "default" &&
          "border-white/10 bg-white/[0.06] text-[var(--text-1)]",
        tone === "accent" && "border-transparent bg-accent/20 text-accent",
        className,
      )}
      {...props}
    />
  );
}
