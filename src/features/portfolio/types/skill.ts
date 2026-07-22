export interface Skill {
  name: string;

  icon?: string;
}

export interface SkillCategory {
  title: string;

  skills: Skill[];
}
