import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

type HeadingProps = ComponentPropsWithoutRef<"h2">;

export default function Heading({ className, ...props }: HeadingProps) {
  return (
    <h2
      {...props}
      className={clsx(
        "font-black",
        "leading-tight",
        "tracking-tight",
        "text-white",
        "text-4xl",
        "md:text-5xl",
        "lg:text-6xl",
        className,
      )}
    />
  );
}
