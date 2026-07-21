import clsx from "clsx";

import type { HeadingProps } from "../types";

const headingStyles = {
  1: "mt-10 mb-6 text-4xl font-bold tracking-tight",
  2: "mt-10 mb-5 text-3xl font-semibold tracking-tight border-b pb-2",
  3: "mt-8 mb-4 text-2xl font-semibold",
  4: "mt-6 mb-3 text-xl font-semibold",
  5: "mt-5 mb-2 text-lg font-semibold",
  6: "mt-4 mb-2 text-base font-semibold text-neutral-500 dark:text-neutral-400",
} as const;

export default function Heading({
  level,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag {...props} className={clsx(headingStyles[level], className)}>
      {children}
    </Tag>
  );
}
