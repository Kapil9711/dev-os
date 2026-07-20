import { EXPERIENCE } from "../data/experience";

export function Experience() {
  return (
    <div className="p-[18px] font-mono text-[12.5px]">
      {EXPERIENCE.map((role) => (
        <div key={role.company}>
          {/* Root commit — the role */}
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className="h-2.5 w-2.5 rounded-full bg-accent-3"
                style={{ boxShadow: "0 0 8px #9b7eff" }}
              />
              <div className="mt-1 w-px flex-1 bg-[var(--line)]" />
            </div>
            <div className="pb-4">
              <div className="font-bold text-[var(--text-1)]">
                commit <span className="text-accent-2">{role.company}</span> —{" "}
                {role.title}
              </div>
              <div className="mt-0.5 text-[11px] text-[var(--text-2)]">
                {role.duration}
              </div>
              <div className="mt-1.5 max-w-[46ch] text-[var(--text-2)]">
                {role.summary}
              </div>
            </div>
          </div>

          {/* Branches — one per project */}
          {role.projects.map((project, i) => {
            const isLast = i === role.projects.length - 1;
            return (
              <div key={project.name} className="flex gap-3 pl-6">
                <div className="flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-white/25" />
                  {!isLast && (
                    <div className="mt-1 w-px flex-1 bg-[var(--line)]" />
                  )}
                </div>
                <div className={isLast ? "pb-2" : "pb-5"}>
                  <div className="font-semibold text-[var(--text-1)]">
                    <span className="text-accent-3">branch</span> {project.name}
                  </div>
                  <div className="mt-0.5 text-[11px] italic text-[var(--text-2)]">
                    {project.summary}
                  </div>
                  {project.highlights.map((h) => (
                    <div key={h} className="mt-1 text-success">
                      + {h}
                    </div>
                  ))}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[10.5px] text-[var(--text-2)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
