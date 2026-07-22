import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

type ParagraphProps = ComponentPropsWithoutRef<"p">;

export default function Paragraph({ className, ...props }: ParagraphProps) {
  return (
    <p
      {...props}
      className={clsx(
        "leading-8",
        "text-[15px]",
        "text-white/70",
        "md:text-lg",
        className,
      )}
    />
  );
}
