"use client";

import Image from "next/image";

import { PROJECTS } from "../../data";

import Badge from "../common/Badge";
import Button from "../common/Button";
import Container from "../common/Container";
import GlassCard from "../common/GlassCard";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";

export default function Projects() {
  return (
    <Section id="projects">
      <Container>
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Projects"
          description="Some of the products and applications I've designed and developed."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {PROJECTS.map((project) => (
            <GlassCard
              key={project.id}
              className="overflow-hidden transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.images[0].image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{project.title}</h3>

                  {project.featured && <Badge>Featured</Badge>}
                </div>

                <p className="mt-5 leading-7 text-white/70">
                  {project.shortDescription}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <Badge key={technology}>{technology}</Badge>
                  ))}
                </div>

                <div className="mt-8 flex gap-4">
                  {project.website && (
                    <Button href={project.website} variant="primary" external>
                      Live Demo
                    </Button>
                  )}

                  {project.github && (
                    <Button href={project.github} variant="secondary" external>
                      GitHub
                    </Button>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Container>
    </Section>
  );
}
