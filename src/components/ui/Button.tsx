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
        "rounded-xl px-4 py-2 text-[12.5px] font-semibold transition active:scale-95",
        variant === "primary" &&
          "border border-cyan-400 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 font-bold text-black shadow-[0_0_12px_rgba(0,240,255,0.35)] hover:brightness-110",
        variant === "ghost" &&
          "border border-cyan-500/20 bg-cyan-950/25 text-cyan-100 hover:border-cyan-400/40 hover:bg-cyan-500/15 hover:shadow-[0_0_10px_rgba(0,240,255,0.15)]",
        className,
      )}
      {...props}
    />
  );
}
