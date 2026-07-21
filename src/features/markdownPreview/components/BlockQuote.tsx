import clsx from "clsx";

import type { BlockquoteProps } from "../types";

export default function Blockquote({
  children,
  className,
  ...props
}: BlockquoteProps & React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      {...props}
      className={clsx(
        "my-6 border-l-4 border-blue-500 bg-blue-50 px-4 py-3 italic text-neutral-700 dark:border-blue-400 dark:bg-blue-950/30 dark:text-neutral-300",
        className,
      )}
    >
      {children}
    </blockquote>
  );
}
