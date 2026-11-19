export interface ProjectEntry {
  name: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface ExperienceEntry {
  company: string;
  title: string;
  duration: string;
  summary: string;
  projects: ProjectEntry[];
}
