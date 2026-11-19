"use client";

import { EXPERIENCE } from "../data/experience";
import { ExperienceCommitNode } from "./ExperienceCommitNode";
import { ExperienceBranchNode } from "./ExperienceBranchNode";

export function Experience() {
  return (
    <div className="p-[18px] pb-10 font-mono text-[12.5px] sm:pb-0">
      {EXPERIENCE.map((role) => (
        <div key={role.company}>
          <ExperienceCommitNode role={role} />

          {role.projects.map((project, i) => (
            <ExperienceBranchNode
              key={project.name}
              project={project}
              isLast={i === role.projects.length - 1}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Experience;
