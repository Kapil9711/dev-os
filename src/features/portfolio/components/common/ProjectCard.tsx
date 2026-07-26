import GlassCard from "../common/GlassCard";
import type { Project } from "../../data";

type Props = {
  project: any;
};

export default function ProjectCard({ project }: Props) {
  return (
    <GlassCard className="overflow-hidden p-5 @3xl:p-7 @5xl:p-10">
      <div className="grid gap-8 @5xl:grid-cols-[1.45fr_1fr] @5xl:gap-12">
        {/* Left */}
        <div>
          <div
            className="max-w-screen relative overflow-hidden rounded-3xl"
            style={{ border: "1px solid var(--line)" }}
          >
            <img
              src={project.images[1].src}
              alt={project.images[1].label}
              className="w-[100%] object-fill transition-transform duration-700 hover:scale-105 @3xl:h-72 @5xl:h-[420px] md:h-96"
            />

            <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white backdrop-blur @3xl:px-4 @3xl:py-2 @3xl:text-sm">
              {project.images[1].label}
            </span>
          </div>

          {/* Mobile horizontal thumbnails */}
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 @5xl:hidden">
            {[project.images[0], project.images[2]].map((img) => (
              <div
                key={img.label}
                className="relative min-w-[98%] overflow-hidden rounded-2xl"
                style={{ border: "1px solid var(--line)" }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 hover:scale-105"
                />

                <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-1 text-[10px] text-white backdrop-blur">
                  {img.label}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop thumbnails */}
          <div className="mt-5 hidden grid-cols-2 gap-4 @5xl:grid">
            {[project.images[0], project.images[2]].map((img) => (
              <div
                key={img.label}
                className="relative overflow-hidden rounded-2xl"
                style={{ border: "1px solid var(--line)" }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 hover:scale-105"
                />

                <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
                  {img.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col">
          <span
            className="font-mono text-[11px] tracking-[0.35em] @3xl:text-xs"
            style={{ color: project.accent }}
          >
            PROJECT {project.index}
          </span>

          <h2
            className="mt-3 text-3xl font-bold leading-tight @3xl:text-4xl @5xl:mt-5 @5xl:text-5xl"
            style={{ color: project.accent }}
          >
            {project.name}
          </h2>

          <p
            className="mt-4 text-base leading-7 @3xl:text-lg @3xl:leading-8"
            style={{ color: "var(--text-2)" }}
          >
            {project.tagline}
          </p>

          <div className="mt-6 space-y-3 @3xl:mt-8 @3xl:space-y-4">
            {project.bullets.map((bullet: any) => (
              <div key={bullet} className="flex items-start gap-3">
                <div
                  className="mt-2 h-2 w-2 shrink-0 rounded-full"
                  style={{ background: project.accent }}
                />

                <p
                  className="text-sm leading-6 @3xl:text-base"
                  style={{ color: "var(--text-2)" }}
                >
                  {bullet}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2 @3xl:mt-10 @3xl:gap-3">
            {project.stack.map((tech: any) => (
              <span
                key={tech}
                className="rounded-full border px-3 py-1.5 text-xs @3xl:px-4 @3xl:py-2 @3xl:text-sm"
                style={{
                  borderColor: `${project.accent}40`,
                  background: `${project.accent}15`,
                  color: "var(--text-1)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {(project.demo || project.github) && (
            <div className="mt-8 flex flex-col gap-3 @3xl:flex-row @5xl:mt-auto @5xl:pt-10">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                  style={{ background: project.accent }}
                >
                  Live Demo →
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center rounded-xl border px-5 py-3 text-sm transition"
                  style={{
                    borderColor: "var(--line)",
                    color: "var(--text-1)",
                  }}
                >
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
