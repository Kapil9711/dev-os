import { PropsWithChildren } from "react";
import clsx from "clsx";

type SectionProps = PropsWithChildren<{
  id?: string;
  className?: string;
  style?: any;
}>;

export default function Section({
  id,
  children,
  className,
  style,
}: SectionProps) {
  return (
    <section
      style={style}
      id={id}
      className={clsx("relative py-10 lg:py-12", className)}
    >
      {children}
    </section>
  );
}
