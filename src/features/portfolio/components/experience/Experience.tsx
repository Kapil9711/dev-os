"use client";

import { EXPERIENCES } from "../../data";

import Badge from "../common/Badge";
import Container from "../common/Container";
import GlassCard from "../common/GlassCard";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";

export default function Experience() {
  return (
    <Section id="experience">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Professional Experience"
          description="Building scalable products, solving real-world problems and delivering high-quality software."
        />

        <div className="mt-16 space-y-8">
          {EXPERIENCES.map((experience) => (
            <GlassCard key={experience.id} className="p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-white">
                    {experience.role}
                  </h3>

                  <p className="mt-2 text-lg text-blue-400">
                    {experience.company}
                  </p>

                  <p className="mt-2 text-white/60">{experience.location}</p>
                </div>

                <Badge className="h-fit">{experience.duration}</Badge>
              </div>

              <p className="mt-8 leading-8 text-white/70">
                {experience.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {experience.technologies.map((technology) => (
                  <Badge key={technology}>{technology}</Badge>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </Container>
    </Section>
  );
}
