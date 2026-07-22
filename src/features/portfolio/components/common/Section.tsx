import { PropsWithChildren } from "react";
import clsx from "clsx";

type SectionProps = PropsWithChildren<{
  id?: string;
  className?: string;
}>;

export default function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className={clsx("relative py-24 lg:py-32", className)}>
      {children}
    </section>
  );
}
