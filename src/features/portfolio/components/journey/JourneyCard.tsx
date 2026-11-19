"use client";

import { Briefcase } from "lucide-react";
import GlassCard from "../common/GlassCard";

export interface JourneyExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
}

interface JourneyCardProps {
  experience: JourneyExperienceItem;
  isVisible: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}

export function JourneyCard({
  experience,
  isVisible,
  cardRef,
}: JourneyCardProps) {
  return (
    <div
      data-experience-id={experience.id}
      ref={cardRef}
      className="ml-12 w-full transition-all duration-700 ease-out @5xl:ml-0 @5xl:w-[46%]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : "translateY(24px) scale(0.98)",
      }}
    >
      <div className="relative overflow-hidden rounded-[20px] p-[1px]">
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

        <GlassCard
          className="relative overflow-hidden p-5 transition-all duration-500 group-hover:-translate-y-1.5 @3xl:p-6 @5xl:p-8"
          style={{
            background: "var(--bg-void)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "var(--glass)",
              backdropFilter: "blur(16px)",
            }}
          />

          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-0 blur-[90px] transition-opacity duration-700 group-hover:opacity-40"
            style={{ background: "var(--accent)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-20"
            style={{ background: "var(--accent-3)" }}
          />

          <div className="relative flex flex-col gap-3 @3xl:flex-row @3xl:flex-wrap @3xl:items-start @3xl:justify-between @3xl:gap-4">
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
                  className="text-lg font-bold leading-snug @3xl:text-xl @5xl:text-2xl"
                  style={{ color: "var(--text-1)" }}
                >
                  {experience.role}
                </h3>
                <p
                  className="mt-1 text-sm font-medium @3xl:text-base"
                  style={{ color: "var(--accent-3)" }}
                >
                  {experience.company}
                </p>
              </div>
            </div>

            <span
              className="flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-colors duration-500 @3xl:px-4 @3xl:py-2 @3xl:text-xs"
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
            className="relative mt-5 border-l-2 pl-4 text-sm leading-7 @3xl:mt-6 @3xl:text-base @3xl:leading-8"
            style={{
              borderColor: "var(--line)",
              color: "var(--text-2)",
            }}
          >
            {experience.description}
          </p>

          <div className="relative mt-6 flex flex-wrap gap-2 @3xl:mt-8 @3xl:gap-3">
            {experience.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 @3xl:px-4 @3xl:py-2 @3xl:text-sm"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--glass)",
                  color: "var(--text-1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.background = "rgba(108,99,255,0.12)";
                  e.currentTarget.style.boxShadow =
                    "inset 0 0 12px rgba(108,99,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line)";
                  e.currentTarget.style.background = "var(--glass)";
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
  );
}
