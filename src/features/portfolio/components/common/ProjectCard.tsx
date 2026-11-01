import GlassCard from "../common/GlassCard";
import type { Project } from "../../data";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const image = project.images[1] ?? project.images[0];

  return (
    <GlassCard className="group overflow-hidden p-3 @3xl:p-4 @5xl:p-5">
      <div className="grid gap-4 @3xl:grid-cols-[0.9fr_1.1fr] @3xl:items-center @3xl:gap-6 @5xl:grid-cols-[1fr_1fr] @5xl:gap-8">
        {/* Project image */}
        <div
          className="group/image relative overflow-hidden rounded-xl"
          style={{
            border: "1px solid var(--line)",
            background: "var(--surface)",
          }}
        >
          {image ? (
            <img
              src={image.src}
              alt={image.label}
              loading="lazy"
              className="aspect-[16/9] w-full object-fill transition-transform duration-500 group-hover/image:scale-[1.03] @3xl:aspect-[5/4] @5xl:aspect-[16/10]"
            />
          ) : (
            <div
              className="flex aspect-[16/9] w-full items-center justify-center"
              style={{ color: project.accent }}
            >
              <span className="text-4xl font-bold">
                {project.name.charAt(0)}
              </span>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15" />

          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[10px] tracking-wider text-white backdrop-blur-md">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: project.accent }}
              />
              PROJECT {project.index}
            </span>
          </div>

          {image && (
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-[10px] font-medium uppercase tracking-widest text-white/70">
                Featured Preview
              </p>
              <p className="mt-0.5 text-base font-semibold text-white @3xl:text-lg">
                {image.label}
              </p>
            </div>
          )}
        </div>

        {/* Project details */}
        <div className="flex min-w-0 flex-col py-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span
              className="font-mono text-[10px] tracking-[0.2em]"
              style={{ color: project.accent }}
            >
              {project.slug.toUpperCase()}
            </span>

            {project.redirectUrl && (
              <a
                href={project.redirectUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.name}`}
                className="inline-flex items-center gap-1 text-xs transition-opacity hover:opacity-70"
                style={{ color: "var(--text-2)" }}
              >
                Visit website <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          <h2
            className="mt-2 text-xl font-bold leading-tight tracking-tight @3xl:text-2xl @5xl:text-3xl"
            style={{ color: project.accent }}
          >
            {project.name}
          </h2>

          <p
            className="mt-2 text-sm leading-5 @3xl:leading-6"
            style={{ color: "var(--text-2)" }}
          >
            {project.tagline}
          </p>

          {/* Key features */}
          <div className="mt-3 space-y-2 @3xl:mt-4">
            {project.bullets.map((bullet, index) => (
              <div
                key={`${project.slug}-${index}`}
                className="flex items-start gap-2.5"
              >
                <span
                  className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: project.accent }}
                />
                <p
                  className="text-xs leading-5 @3xl:text-sm"
                  style={{ color: "var(--text-2)" }}
                >
                  {bullet}
                </p>
              </div>
            ))}
          </div>

          {/* Technology tags */}
          <div className="mt-4">
            <p
              className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "var(--text-2)" }}
            >
              Technologies
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border px-2 py-1 text-[10px] font-medium @3xl:text-[11px]"
                  style={{
                    borderColor: `${project.accent}40`,
                    backgroundColor: `${project.accent}12`,
                    color: "var(--text-1)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action */}
          {project.redirectUrl && (
            <div className="mt-4">
              <a
                href={project.redirectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110"
                style={{
                  backgroundColor: project.accent,
                  boxShadow: `0 3px 12px ${project.accent}25`,
                }}
              >
                Explore Project <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
