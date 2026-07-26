"use client";

import { ABOUT } from "../../data/about";

import Badge from "../common/Badge";
import Container from "../common/Container";
import Heading from "../common/Heading";
import Paragraph from "../common/Paragraph";
import Section from "../common/Section";
import TiltPanel from "../common/TiltPannel";
import AboutScene from "../three/AboutScene";

const SKILL_SECTIONS = [
  {
    title: "Frontend",
    items: ABOUT.frontend,
  },
  {
    title: "Backend",
    items: ABOUT.backend,
  },
  {
    title: "Databases",
    items: ABOUT.databases,
  },
  {
    title: "Tools & DevOps",
    items: ABOUT.tools,
  },
];

export default function About() {
  return (
    <Section id="about" className="relative overflow-hidden py-10">
      {/* Background */}
      <div className="@3xl:block pointer-events-none absolute inset-0 -z-10 hidden opacity-80">
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
        <Badge className="mb-6 inline-flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: "var(--accent-2)",
              boxShadow: "0 0 12px var(--accent-2)",
            }}
          />
          <span>02 · {ABOUT.title}</span>
        </Badge>

        <Heading className="max-w-3xl">
          Building scalable digital products with clean architecture.
        </Heading>

        <Paragraph className="mt-6 max-w-4xl text-lg leading-8">
          {ABOUT.intro}
        </Paragraph>

        {/* Stats */}
        <div className="@7xl:grid-cols-4 mt-12 grid grid-cols-2 gap-4">
          {[
            { value: "2+", label: "Years Experience" },
            { value: "20+", label: "Projects" },
            { value: "15+", label: "Technologies" },
            { value: "100%", label: "Production Focus" },
          ].map((item) => (
            <TiltPanel key={item.label} className="text-center">
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                {item.value}
              </div>

              <p className="mt-2 text-sm text-[var(--text-2)]">{item.label}</p>
            </TiltPanel>
          ))}
        </div>

        {/* Skills */}
        <div className="@5xl:grid-cols-2 mt-12 grid gap-5">
          {SKILL_SECTIONS.map((section) => (
            <TiltPanel key={section.title}>
              <h3
                className="mb-5 text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: "var(--accent-3)" }}
              >
                {section.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300 hover:-translate-y-1"
                    style={{
                      color: "var(--text-1)",
                      background:
                        "color-mix(in srgb, var(--accent) 12%, transparent)",
                      border:
                        "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </TiltPanel>
          ))}
        </div>

        {/* Passion */}
        <div className="mt-8">
          <TiltPanel>
            <h3
              className="mb-5 text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--accent-3)" }}
            >
              What I Enjoy Building
            </h3>

            <div className="flex flex-wrap gap-3">
              {ABOUT.passion.map((item) => (
                <span
                  key={item}
                  className="rounded-full px-4 py-2 text-sm font-medium"
                  style={{
                    color: "var(--text-1)",
                    background:
                      "color-mix(in srgb, var(--accent-2) 10%, transparent)",
                    border:
                      "1px solid color-mix(in srgb, var(--accent-2) 24%, transparent)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </TiltPanel>
        </div>
      </Container>
    </Section>
  );
}
