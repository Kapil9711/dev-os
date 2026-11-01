"use client";

import Badge from "../common/Badge";
import Container from "../common/Container";
import Heading from "../common/Heading";
import ProjectCard from "../common/ProjectCard";
import Section from "../common/Section";
import ScrollStack, { ScrollStackItem } from "../common/ScrollStack";

import { PROJECTS } from "../../data";

export default function Projects() {
  return (
    <Section
      id="projects"
      className="relative overflow-hidden py-16 @container lg:py-24"
      style={{
        background: `
          radial-gradient(circle at top, rgba(99,102,241,.08), transparent 45%),
          radial-gradient(circle at bottom right, rgba(16,185,129,.06), transparent 45%)
        `,
      }}
    >
      <Container className="relative z-10 min-w-0">
        <Badge className="mb-6">04 · Selected Work</Badge>

        <Heading className="max-w-3xl">
          Projects I've designed, built and shipped.
        </Heading>

        <p
          className="mt-5 max-w-2xl text-base @md:text-lg"
          style={{ color: "var(--text-2)" }}
        >
          Production applications built from idea to deployment with a strong
          focus on performance, scalability and user experience.
        </p>

        <div className="mt-8 min-w-0 @md:mt-8">
          <div className="h-[700px] w-full min-w-0 rounded-xl @md:h-[530px] @md:scale-95 @md:border @md:border-gray-800">
            <ScrollStack
              className="h-full w-full min-w-0"
              itemDistance={20}
              itemStackDistance={18}
              baseScale={0.96}
              itemScale={0.02}
              dimAmount={0.12}
              holdDistance={120}
            >
              {PROJECTS.map((project) => (
                <ScrollStackItem key={project.slug}>
                  <ProjectCard project={project} />
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </div>
      </Container>
    </Section>
  );
}
