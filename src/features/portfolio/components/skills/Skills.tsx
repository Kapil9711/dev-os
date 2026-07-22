"use client";

import { SKILLS } from "../../data";

import Container from "../common/Container";
import GlassCard from "../common/GlassCard";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";

export default function Skills() {
  return (
    <Section id="skills">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I Work With"
          description="My technology stack for building scalable web, mobile and backend applications."
        />

        <div className="mt-16 space-y-10">
          {SKILLS.map((category) => (
            <div key={category.title}>
              <h3 className="mb-6 text-2xl font-semibold text-white">
                {category.title}
              </h3>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {category.skills.map((skill) => (
                  <GlassCard
                    key={skill.name}
                    className="group flex flex-col items-center justify-center p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40"
                  >
                    {skill.icon && (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="mb-4 h-12 w-12 object-contain"
                      />
                    )}

                    <span className="text-center text-sm font-medium text-white/80 transition-colors group-hover:text-white">
                      {skill.name}
                    </span>
                  </GlassCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
