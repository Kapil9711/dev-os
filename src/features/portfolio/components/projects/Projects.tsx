"use client";

import Badge from "../common/Badge";
import Container from "../common/Container";
import Heading from "../common/Heading";
import ProjectCard from "../common/ProjectCard";
import Section from "../common/Section";

import { PROJECTS } from "../../data";

export default function Projects() {
  return (
    <Section
      id="projects"
      className="relative overflow-hidden py-28"
      style={{
        background: `
          radial-gradient(circle at top, rgba(99,102,241,.08), transparent 45%),
          radial-gradient(circle at bottom right, rgba(16,185,129,.06), transparent 45%)
        `,
      }}
    >
      <Container className="relative z-10">
        <Badge className="mb-6">04 · Selected Work</Badge>

        <Heading className="max-w-3xl">
          Projects I've designed, built and shipped.
        </Heading>

        <p
          className="mt-5 max-w-2xl text-lg"
          style={{ color: "var(--text-2)" }}
        >
          Production applications built from idea to deployment with a strong
          focus on performance, scalability and user experience.
        </p>

        <div className="mt-20 space-y-24">
          {PROJECTS.map((project, index) => (
            <div
              key={project.slug}
              className="mb-24 rounded-[32px] border"
              style={{
                borderColor: "rgba(255,255,255,.08)",
                background: "linear-gradient(180deg,#1B2030,#171C2B)",
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
