import clsx from "clsx";

import type { ImageProps } from "../types";

export default function Image({
  className,
  alt = "",
  loading = "lazy",
  ...props
}: ImageProps) {
  return (
    <img
      {...props}
      alt={alt}
      loading={loading}
      className={clsx(
        "my-6 h-auto max-w-full rounded-lg border border-neutral-200 shadow-sm dark:border-neutral-800",
        className,
      )}
    />
  );
}
