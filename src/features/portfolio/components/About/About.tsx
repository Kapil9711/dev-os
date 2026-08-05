"use client";

import { ABOUT } from "../../data/about";

import Badge from "../common/Badge";
import Container from "../common/Container";
import Heading from "../common/Heading";
import Paragraph from "../common/Paragraph";
import Section from "../common/Section";
import SideRays from "../common/SideRays";
import TiltPanel from "../common/TiltPannel";
import AboutScene from "../three/AboutScene";

const SKILL_SECTIONS = [
  { title: "frontend", items: ABOUT.frontend },
  { title: "backend", items: ABOUT.backend },
  { title: "databases", items: ABOUT.databases },
  { title: "tools", items: ABOUT.tools },
];

const STATS = [
  { key: "experience", value: "2+ yrs" },
  { key: "projects.length", value: "20+" },
  { key: "stack.length", value: "15+" },
  { key: "production_focus", value: "100%" },
];

export default function About() {
  return (
    <Section id="about" className="relative overflow-hidden py-10">
      <div
        style={{ width: "100%", height: "700px", position: "absolute" }}
        className="hidden @3xl:block"
      >
        <SideRays
          speed={2}
          rayColor1="#9b7eff"
          rayColor2="#9b7eff"
          intensity={1.5}
          spread={1.5}
          origin="top-right"
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1}
        />
      </div>

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden opacity-80 @3xl:block">
        <AboutScene />
      </div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <Container>
        <Badge className="mb-6 inline-flex items-center gap-2 font-mono">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: "var(--accent-2)",
              boxShadow: "0 0 12px var(--accent-2)",
            }}
          />
          <span>~about.me</span>
        </Badge>

        <Heading className="max-w-3xl">
          Building scalable digital products with clean architecture.
        </Heading>

        {/* Narrative + live status on the left, stack listing on the right —
           replaces the old single-column badge/paragraph/card-grid stack. */}
        <div className="mt-10 grid gap-8 @5xl:grid-cols-[1.1fr_1fr] @5xl:items-start">
          {/* Left column */}
          <div className="flex flex-col gap-8 @5xl:sticky @5xl:top-28">
            <Paragraph className="max-w-xl text-lg leading-8">
              {ABOUT.intro}
            </Paragraph>

            {/* The one signature panel — everything else stays quiet */}
            <TiltPanel className="font-mono text-sm">
              <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--text-2)]">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                status
              </div>

              <dl className="space-y-3">
                {STATS.map((stat, i) => (
                  <div
                    key={stat.key}
                    className="flex items-baseline justify-between border-b border-white/5 pb-3 last:border-none last:pb-0"
                  >
                    <dt className="text-[var(--text-2)]">{stat.key}</dt>
                    <dd
                      className="font-semibold"
                      style={{
                        color:
                          i % 2 === 0 ? "var(--accent)" : "var(--accent-3)",
                      }}
                    >
                      {stat.value}
                      {i === STATS.length - 1 && (
                        <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-[var(--accent)] align-middle" />
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </TiltPanel>
          </div>

          {/* Right column: stack + passion, styled like directory listings */}
          <div className="flex flex-col gap-6">
            {SKILL_SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-2)]">
                  <span style={{ color: "var(--accent-3)" }}>~/</span>
                  {section.title}
                </h3>

                <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 @lg:grid-cols-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="group flex items-center gap-2 border-l pl-3 text-sm text-[var(--text-1)]"
                      style={{
                        borderColor:
                          "color-mix(in srgb, var(--accent) 20%, transparent)",
                      }}
                    >
                      <span
                        className="text-xs transition-transform duration-200 group-hover:translate-x-0.5"
                        style={{ color: "var(--accent)" }}
                      >
                        ▸
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Passion, as tags rather than a boxed card */}
            <div>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-2)]">
                <span style={{ color: "var(--accent-2)" }}>#</span>
                enjoys-building
              </h3>

              <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm">
                {ABOUT.passion.map((item) => (
                  <span key={item} style={{ color: "var(--text-1)" }}>
                    <span style={{ color: "var(--accent-2)" }}>#</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
