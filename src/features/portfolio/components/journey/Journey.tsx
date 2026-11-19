"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Container from "../common/Container";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import JourneyScene from "../three/JourneyScene";
import { JOURNEY } from "../../data/journey";
import { JourneyCard } from "./JourneyCard";
import { JourneyTimelineDot } from "./JourneyTimelineDot";

export default function Journey() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const isVisibleRef = useRef(false);
  const rafRef = useRef<number>();

  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const revealObserverRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    containerRef.current = document.getElementById(
      "window-container-portfolio",
    ) as HTMLElement | null;
  }, []);

  // Scroll-progress loop feeding the Three.js beam
  useEffect(() => {
    const timeline = timelineRef.current;
    const container = containerRef.current;

    if (!timeline || !container) return;

    function tick() {
      if (!isVisibleRef.current) {
        rafRef.current = undefined;
        return;
      }

      if (!timeline || !container) return;

      const timelineRect = timeline.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const viewportHeight = container.clientHeight;

      const top = timelineRect.top - containerRect.top;
      const total = timelineRect.height + viewportHeight;
      const scrolled = viewportHeight - top;

      progressRef.current = Math.min(1, Math.max(0, scrolled / total));
      rafRef.current = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && rafRef.current === undefined) {
          rafRef.current = requestAnimationFrame(tick);
        }
      },
      { root: container },
    );

    observer.observe(timeline);

    return () => {
      observer.disconnect();
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Reveal observer for cards
  useEffect(() => {
    if (!containerRef.current) return;

    revealObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.getAttribute("data-experience-id");
          if (!id) return;

          revealObserverRef.current?.unobserve(entry.target);

          setVisibleIds((prev) => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            return next;
          });
        });
      },
      {
        root: containerRef.current,
        threshold: 0.1,
        rootMargin: "0px 0px -30% 0px",
      },
    );

    Object.values(cardRefs.current).forEach((el) => {
      if (el) revealObserverRef.current?.observe(el);
    });

    return () => revealObserverRef.current?.disconnect();
  }, []);

  const setCardRef = useCallback((id: string) => {
    return (el: HTMLDivElement | null) => {
      cardRefs.current[id] = el;
      if (el) {
        revealObserverRef.current?.observe(el);
      }
    };
  }, []);

  return (
    <Section id="journey">
      <Container>
        <SectionHeading
          eyebrow="Journey"
          title="My Professional Journey"
          description="A timeline of my growth as a software engineer, from learning the fundamentals to building production-ready applications."
        />

        <div ref={timelineRef} className="relative mt-16 @3xl:mt-20">
          <div className="pointer-events-none absolute inset-0 -z-10 hidden @5xl:block">
            <JourneyScene progressRef={progressRef} />
          </div>

          <div
            className="absolute left-4 top-0 h-full w-px @5xl:left-1/2 @5xl:-translate-x-1/2"
            style={{ background: "var(--line)" }}
          />

          <div className="space-y-8 @3xl:space-y-12">
            {JOURNEY.map((experience, index) => {
              const isLeft = index % 2 === 0;
              const isVisible = visibleIds.has(experience.id);

              return (
                <div
                  key={experience.id}
                  className={`group relative flex w-full ${
                    isLeft ? "@5xl:justify-start" : "@5xl:justify-end"
                  }`}
                >
                  <JourneyTimelineDot
                    isVisible={isVisible}
                    isLeft={isLeft}
                  />

                  <JourneyCard
                    experience={experience}
                    isVisible={isVisible}
                    cardRef={setCardRef(experience.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
