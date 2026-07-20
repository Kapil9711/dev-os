import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

/** Base button: gradient primary action or subdued ghost/toolbar action. */
export function Button({ variant = "ghost", className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "rounded-lg px-4 py-2 text-[13px] font-semibold transition",
        variant === "primary" &&
          "bg-gradient-to-br from-accent to-accent-2 text-white hover:brightness-110",
        variant === "ghost" &&
          "border border-white/10 bg-white/[0.06] text-[var(--text-1)] hover:bg-white/[0.1]",
        className,
      )}
      {...props}
    />
  );
}
