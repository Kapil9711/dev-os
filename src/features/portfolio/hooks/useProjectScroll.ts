"use client";

import { useEffect, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useProjectsScroll({
  stageRef,
  trackRef,
  count,
}: {
  stageRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  count: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track || count === 0) return;

    // No outer gsap.context() here -- matchMedia() already scopes and
    // reverts each breakpoint's animations on its own. Nesting a second
    // context around it just means two revert() calls fire on cleanup,
    // a known source of flaky ScrollTrigger state under Strict Mode.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - stage.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => "+=" + Math.max(1, track.scrollWidth - stage.clientWidth),
          scrub: 0.3,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
            setActiveIndex(
              Math.min(count - 1, Math.round(self.progress * (count - 1))),
            );
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    mm.add("(max-width: 1023px)", () => {
      const cards = Array.from(track.children) as HTMLElement[];

      const fadeIns = cards.map((card) =>
        gsap.from(card, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        }),
      );

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(cards.indexOf(entry.target as HTMLElement));
            }
          });
        },
        { threshold: 0.6 },
      );
      cards.forEach((card) => io.observe(card));

      return () => {
        fadeIns.forEach((tw) => tw.scrollTrigger?.kill());
        io.disconnect();
      };
    });

    // The actual fix: anything upstream on the page (webfonts swapping
    // in, images, the ProjectsBackground WebGL canvas sizing itself)
    // can change page height *after* ScrollTrigger measures this
    // section's start/end. invalidateOnRefresh only re-measures on a
    // refresh that actually happens -- force one once things settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const settleTimer = window.setTimeout(refresh, 500);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(settleTimer);
      mm.revert();
    };
  }, [stageRef, trackRef, count]);

  return { activeIndex, progress };
}
