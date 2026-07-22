"use client";

import clsx from "clsx";
import { PropsWithChildren, useRef } from "react";

import { useReveal } from "../../hooks";

type RevealProps = PropsWithChildren<{
  className?: string;
}>;

export default function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useReveal(ref);

  return (
    <div ref={ref} className={clsx("opacity-0", className)}>
      {children}
    </div>
  );
}
