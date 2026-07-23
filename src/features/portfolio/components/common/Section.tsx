import { PropsWithChildren } from "react";
import clsx from "clsx";

type SectionProps = PropsWithChildren<{
  id?: string;
  className?: string;
}>;

export default function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className={clsx("relative py-10 lg:py-12", className)}>
      {children}
    </section>
  );
}
