"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Container from "../common/Container";
import GlassCard from "../common/GlassCard";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import JourneyScene from "../three/JourneyScene";
import Galaxy from "../common/GalaxyBackground";
import { JOURNEY } from "../../data/journey";
import { Briefcase } from "lucide-react";

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
            {JOURNEY.map((experience, index) => {
              const isLeft = index % 2 === 0;
              const isVisible = visibleIds.has(experience.id);

              return (
                <div
                  key={experience.id}
                  className={`group relative flex w-full ${
                    isLeft ? "lg:justify-start" : "lg:justify-end"
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-4 top-8 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-4 transition-all duration-700 lg:left-1/2"
                    style={{
                      borderColor: "var(--bg-void)",
                      background: "var(--accent-2)",
                      boxShadow: isVisible
                        ? "0 0 0 5px rgba(108,99,255,0.15), 0 0 20px rgba(108,99,255,0.4)"
                        : "0 0 0 0px rgba(108,99,255,0)",
                    }}
                  >
                    <span
                      className="absolute h-2 w-2 rounded-full transition-transform duration-700"
                      style={{
                        background: "var(--text-1)",
                        transform: isVisible ? "scale(1)" : "scale(0)",
                      }}
                    />
                  </div>

                  {/* Connecting stub, desktop only */}
                  <div
                    className={`absolute top-[38px] hidden h-px transition-all duration-700 lg:block ${
                      isLeft ? "left-1/2 right-[54%]" : "left-[54%] right-1/2"
                    }`}
                    style={{
                      background:
                        "linear-gradient(90deg, var(--accent-2), transparent)",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: isLeft ? "left" : "right",
                    }}
                  />

                  <div
                    data-experience-id={experience.id}
                    ref={setCardRef(experience.id)}
                    className="ml-12 w-full transition-all duration-700 ease-out lg:ml-0 lg:w-[46%]"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateY(0) scale(1)"
                        : "translateY(24px) scale(0.98)",
                    }}
                  >
                    {/* Border-ring wrapper — overflow-hidden clips the oversized
                      rotating gradient into a thin sweeping ring */}
                    <div
                      className="relative overflow-hidden rounded-2xl p-[1px]"
                      style={{ background: "var(--line)" }}
                    >
                      {/* Oversized rotating conic gradient, clipped by the
                        parent above. Opacity fades in on hover only —
                        the animation itself runs continuously so there's
                        no restart jank. */}
                      <div
                        className="border-spin-layer pointer-events-none absolute left-1/2 top-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          width: "250%",
                          height: "250%",
                          background:
                            "conic-gradient(from 0deg, transparent 0%, var(--accent) 8%, transparent 18%)",
                          animation: "border-spin 3.5s linear infinite",
                          transform: "translate(-50%, -50%)",
                        }}
                      />

                      {/* Opaque base layer — this is what keeps the gradient
                        confined to the 1px edge instead of bleeding through
                        the middle of the card */}
                      <GlassCard
                        className="relative overflow-hidden p-5 transition-all duration-500 group-hover:-translate-y-1.5 sm:p-6 lg:p-8"
                        style={{
                          background: "var(--bg-void)",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                        }}
                      >
                        {/* Frosted tint layer sits above the opaque base,
                          below the content */}
                        <div
                          className="pointer-events-none absolute inset-0 rounded-2xl"
                          style={{
                            background: "var(--glass)",
                            backdropFilter: "blur(16px)",
                          }}
                        />

                        {/* Ambient glow blobs */}
                        <div
                          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-0 blur-[90px] transition-opacity duration-700 group-hover:opacity-40"
                          style={{ background: "var(--accent)" }}
                        />
                        <div
                          className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-20"
                          style={{ background: "var(--accent-3)" }}
                        />

                        <div className="relative flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
                          <div className="flex items-start gap-3.5">
                            <div
                              className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border transition-colors duration-500 group-hover:border-transparent"
                              style={{
                                borderColor: "var(--line)",
                                background: "var(--glass)",
                              }}
                            >
                              <div
                                className="border-spin-layer pointer-events-none absolute left-1/2 top-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                style={{
                                  width: "250%",
                                  height: "250%",
                                  background:
                                    "conic-gradient(from 0deg, transparent 0%, var(--accent-2) 10%, transparent 22%)",
                                  animation: "border-spin 3s linear infinite",
                                  transform: "translate(-50%, -50%)",
                                }}
                              />
                              <div
                                className="relative z-10 flex h-[calc(100%-2px)] w-[calc(100%-2px)] items-center justify-center rounded-[10px]"
                                style={{ background: "var(--bg-void)" }}
                              >
                                <Briefcase
                                  size={18}
                                  style={{ color: "var(--accent-3)" }}
                                />
                              </div>
                            </div>

                            <div>
                              <h3
                                className="text-lg font-bold leading-snug sm:text-xl lg:text-2xl"
                                style={{ color: "var(--text-1)" }}
                              >
                                {experience.role}
                              </h3>
                              <p
                                className="mt-1 text-sm font-medium sm:text-base"
                                style={{ color: "var(--accent-3)" }}
                              >
                                {experience.company}
                              </p>
                            </div>
                          </div>

                          <span
                            className="flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-colors duration-500 sm:px-4 sm:py-2 sm:text-xs"
                            style={{
                              borderColor: "var(--line)",
                              background: "var(--glass)",
                              color: "var(--text-2)",
                            }}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{
                                background: "var(--success)",
                                boxShadow: "0 0 8px var(--success)",
                              }}
                            />
                            {experience.duration}
                          </span>
                        </div>

                        <p
                          className="relative mt-5 border-l-2 pl-4 text-sm leading-7 sm:mt-6 sm:text-base sm:leading-8"
                          style={{
                            borderColor: "var(--line)",
                            color: "var(--text-2)",
                          }}
                        >
                          {experience.description}
                        </p>

                        <div className="relative mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                          {experience.technologies.map((technology) => (
                            <span
                              key={technology}
                              className="rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 sm:px-4 sm:py-2 sm:text-sm"
                              style={{
                                borderColor: "var(--line)",
                                background: "var(--glass)",
                                color: "var(--text-1)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor =
                                  "var(--accent)";
                                e.currentTarget.style.background =
                                  "rgba(108,99,255,0.12)";
                                e.currentTarget.style.boxShadow =
                                  "inset 0 0 12px rgba(108,99,255,0.15)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor =
                                  "var(--line)";
                                e.currentTarget.style.background =
                                  "var(--glass)";
                                e.currentTarget.style.boxShadow = "none";
                              }}
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      </GlassCard>
                    </div>
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
