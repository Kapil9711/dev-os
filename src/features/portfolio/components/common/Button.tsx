import Link from "next/link";
import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-black border-white hover:-translate-y-1 hover:shadow-xl",

  secondary:
    "border-white/10 bg-white/5 text-white hover:border-blue-400 hover:bg-white/10 hover:-translate-y-1",

  ghost: "border-transparent text-white hover:bg-white/10",
};

export default function Button({
  href,
  children,
  variant = "secondary",
  className,
  external,
  ...props
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center",
    "rounded-full",
    "border",
    "px-7 py-4",
    "font-mono",
    "text-[11px]",
    "uppercase",
    "tracking-[0.18em]",
    "transition-all",
    "duration-300",
    variants[variant],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
