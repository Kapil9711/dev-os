"use client";

import { useRef } from "react";
import { PROJECTS } from "../../data";

import Badge from "../common/Badge";
import Button from "../common/Button";
import Container from "../common/Container";
import GlassCard from "../common/GlassCard";
import ImageWithFallback from "../common/ImageWithFallback";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import ProjectsBackground from "../three/ProjectScene";
import ScrollStack, { ScrollStackItem } from "../common/ScrollStack";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <Section id="projects">
      <div ref={sectionRef} className="relative">
        <ProjectsBackground sectionRef={sectionRef} />

        <Container className="relative z-10">
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured Projects"
            description="Some of the products and applications I've designed and developed."
          />

          <div className="mt-16 h-[640px] sm:h-[720px] lg:h-[820px]">
            <ScrollStack
              itemDistance={70}
              itemScale={0.035}
              itemStackDistance={24}
              stackPosition="18%"
              scaleEndPosition="6%"
              baseScale={0.88}
              blurAmount={1.5}
            >
              {PROJECTS.map((project: any) => (
                <ScrollStackItem key={project.id}>
                  <GlassCard className="group overflow-hidden">
                    {/* bento gallery: 1 big image (2x2) + up to 2 small images */}
                    <div className="grid aspect-video grid-cols-3 grid-rows-2 gap-1 overflow-hidden">
                      <div className="relative col-span-2 row-span-2">
                        <ImageWithFallback
                          src={project?.images?.[0]?.image}
                          alt={project?.images?.[0]?.alt}
                          fill
                          fallbackLabel={project.images?.[0]?.image}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {project.images.slice(1, 3).map((img: any) => (
                        <div
                          key={img.image}
                          className="relative col-span-1 row-span-1"
                        >
                          <ImageWithFallback
                            src={img.image}
                            alt={img.alt}
                            fill
                            fallbackLabel={img.image}
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="p-8">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                        {project.featured && <Badge>Featured</Badge>}
                      </div>

                      <p className="mt-5 leading-7 text-white/70">
                        {project.shortDescription ?? project.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.technologies.map((technology: any) => (
                          <Badge key={technology}>{technology}</Badge>
                        ))}
                      </div>

                      <div className="mt-8 flex gap-4">
                        {project.website && (
                          <Button
                            href={project.website}
                            variant="primary"
                            external
                          >
                            Live Demo
                          </Button>
                        )}
                        {project.github && (
                          <Button
                            href={project.github}
                            variant="secondary"
                            external
                          >
                            GitHub
                          </Button>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </Container>
      </div>
    </Section>
  );
}
