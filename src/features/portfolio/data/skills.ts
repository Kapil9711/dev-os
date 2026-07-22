import { SkillCategory } from "../types";

export const SKILLS: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Tailwind CSS" },
      { name: "Redux Toolkit" },
      { name: "React Query" },
    ],
  },
  {
    title: "Mobile",
    skills: [{ name: "React Native" }, { name: "Expo" }],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST API" },
      { name: "JWT" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB" },
      { name: "Mongoose" },
      { name: "Elasticsearch" },
    ],
  },
  {
    title: "DevOps",
    skills: [
      { name: "Docker" },
      { name: "Git" },
      { name: "Linux" },
      { name: "GitHub Actions" },
    ],
  },
];
