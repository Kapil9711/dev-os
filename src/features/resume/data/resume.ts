import { DEV, EDUCATION, SKILL_GROUPS } from "@/constants/dev";
import { EXPERIENCE } from "@/features/experience/data/experience";
import { PROJECTS } from "@/features/projects/data/projects";

export function buildResumeMarkdown(): string {
  return `# ${DEV.name}
${DEV.tagline} · ${DEV.experience} experience

## Summary
${DEV.summary}

## Skills
${SKILL_GROUPS.map((g) => `**${g.group}:** ${g.items.join(", ")}`).join("\n")}

## Experience
${EXPERIENCE.map((e) => `**${e.duration} — ${e.title}**\n${e.projects.map((h) => `- ${h}`).join("\n")}`).join("\n\n")}

## Projects
${PROJECTS.map((p) => `- **${p.name}** — ${p.desc}`).join("\n")}

## Education
${EDUCATION.degree} — ${EDUCATION.school}

## Contact
${DEV.email} · ${DEV.phone} · ${DEV.github} · ${DEV.linkedin}
`;
}
