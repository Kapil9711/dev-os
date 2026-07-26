"use client";

import clsx from "clsx";
import { PropsWithChildren, useRef } from "react";

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

("use client");

import { RefObject, useEffect } from "react";

export function useReveal(
  ref: RefObject<HTMLElement | null>,
  options?: {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
  },
) {
  const { threshold = 0.15, rootMargin = "0px", once = true } = options ?? {};

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]: any) => {
        if (entry.isIntersecting) {
          element.classList.remove("opacity-0");
          element.classList.add(
            "opacity-100",
            "translate-y-0",
            "transition-all",
            "duration-700",
            "ease-out",
          );

          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          element.classList.remove("opacity-100");
          element.classList.add("opacity-0");
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    element.classList.add("translate-y-6");

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, once]);
}
