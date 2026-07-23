"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { EXPERIENCES } from "../../data";

import Container from "../common/Container";
import GlassCard from "../common/GlassCard";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import JourneyScene from "../three/JourneyScene";
import Galaxy from "../common/GalaxyBackground";

export default function Journey() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const isVisibleRef = useRef(false);
  const rafRef = useRef<number>();

  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // Created once, persisted across renders — cards attach to *this same*
  // instance the moment they mount, so there's no window where a card
  // exists in the DOM but hasn't been handed to the observer yet.
  const revealObserverRef = useRef<IntersectionObserver | null>(null);

  // Scroll-progress loop feeding the Three.js beam — unchanged.
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    function tick() {
      if (!isVisibleRef.current || !el) {
        rafRef.current = undefined;
        return;
      }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      progressRef.current = Math.min(1, Math.max(0, scrolled / total));
      rafRef.current = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(([entry]: any) => {
      isVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting && rafRef.current === undefined) {
        rafRef.current = requestAnimationFrame(tick);
      }
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Create the reveal observer once. It does NOT scan cardRefs.current —
  // cards register themselves via setCardRef below, as soon as they exist.
  useEffect(() => {
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
        threshold: 0.1,
        // Reveal as a card enters from the bottom, not once it's already
        // most of the way up the screen.
        rootMargin: "0px 0px -30% 0px",
      },
    );

    return () => revealObserverRef.current?.disconnect();
  }, []);

  const setCardRef = useCallback((id: string) => {
    return (el: HTMLDivElement | null) => {
      cardRefs.current[id] = el;
      if (el) {
        // Safe to call even if this card was already being observed —
        // per spec, observe() on an already-observed target is a no-op.
        revealObserverRef.current?.observe(el);
      }
    };
  }, []);

  const sectionRef = useRef(null as any);

  return (
    <Section id="journey">
      <Container>
        <SectionHeading
          eyebrow="Journey"
          title="My Professional Journey"
          description="A timeline of my growth as a software engineer, from learning the fundamentals to building production-ready applications."
        />

        <div ref={timelineRef} className="relative mt-16 sm:mt-20">
          <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
            <JourneyScene progressRef={progressRef} />
          </div>

          <div
            className="absolute left-4 top-0 h-full w-px lg:left-1/2 lg:-translate-x-1/2"
            style={{ background: "var(--line)" }}
          />

          <div className="space-y-8 sm:space-y-12">
            {EXPERIENCES.map((experience, index) => {
              const isLeft = index % 2 === 0;
              const isVisible = visibleIds.has(experience.id);

              return (
                <div
                  key={experience.id}
                  className={`relative flex w-full ${isLeft ? "lg:justify-start" : "lg:justify-end"}`}
                >
                  <div
                    className="absolute left-4 top-8 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 transition-shadow duration-700 lg:left-1/2"
                    style={{
                      borderColor: "var(--bg-void)",
                      background: "var(--accent-2)",
                      boxShadow: isVisible
                        ? "0 0 0 5px rgba(108,99,255,0.15)"
                        : "0 0 0 0px rgba(108,99,255,0)",
                    }}
                  />

                  <div
                    data-experience-id={experience.id}
                    ref={setCardRef(experience.id)}
                    className="ml-12 w-full transition-all duration-700 ease-out lg:ml-0 lg:w-[46%]"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateY(0)"
                        : "translateY(24px)",
                    }}
                  >
                    <GlassCard className="p-5 sm:p-6 lg:p-8">
                      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                        <div>
                          <h3
                            className="text-lg font-bold sm:text-xl lg:text-2xl"
                            style={{ color: "var(--text-1)" }}
                          >
                            {experience.role}
                          </h3>
                          <p
                            className="mt-1.5 text-sm sm:mt-2 sm:text-base"
                            style={{ color: "var(--text-2)" }}
                          >
                            {experience.company}
                          </p>
                        </div>

                        <span
                          className="w-fit rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-wider sm:px-4 sm:py-2 sm:text-xs"
                          style={{
                            borderColor: "var(--line)",
                            color: "var(--text-2)",
                          }}
                        >
                          {experience.duration}
                        </span>
                      </div>

                      <p
                        className="mt-5 text-sm leading-7 sm:mt-6 sm:text-base sm:leading-8"
                        style={{ color: "var(--text-2)" }}
                      >
                        {experience.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                        {experience.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full border px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm"
                            style={{
                              borderColor: "var(--line)",
                              background: "var(--glass)",
                              color: "var(--text-1)",
                            }}
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
