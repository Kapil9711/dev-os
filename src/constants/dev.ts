/**
 * Source of truth for the developer's identity, pulled from the supplied
 * resume (Kapil Rajput — Software Engineer, Full-Stack MERN/Next.js).
 */
export const DEV = {
  name: "Kapil Rajput",
  role: "Software Engineer",
  tagline: "Full-Stack Engineer (MERN / Next.js)",
  experience: "2+ Years",
  location: "Bijnor, Uttar Pradesh, India",
  email: "kapil.rajput9711@gmail.com",
  phone: "+91 8449111099",
  github: "https://github.com/Kapil9711",
  githubHandle: "Kapil9711",
  linkedin: "https://linkedin.com/in/kapil-rajput-53573326b",
  linkedinHandle: "Kapil Rajput",
  website: "https://kapil9711.github.io/my-portfolio/",
  photo: "/images/profile.jpeg",
  stack: [
    "React",
    "Next.js",
    "React Native",
    "Node.js",
    "Docker",
    "Elasticsearch",
  ] as const,
  summary:
    "Software Engineer with 2 years of experience building production-scale web and mobile platforms across e-commerce, fintech, and marketplace domains. Experienced in scalable REST APIs, Next.js SSR, React Native, Elasticsearch, Docker, and AWS. Passionate about owning features end-to-end, optimizing performance, writing clean documentation, and building reliable systems used by real business operations.",
} as const;

export const SKILL_GROUPS = [
  {
    group: "Frontend",
    icon: "🎨",
    items: ["React", "Next.js", "Redux", "React Native", "Tailwind CSS"],
  },
  {
    group: "Backend",
    icon: "🛠️",
    items: ["Node.js", "Express", "REST APIs"],
  },
  {
    group: "Database",
    icon: "🔎",
    items: ["MongoDB", "Elasticsearch", "Redis"],
  },
  {
    group: "Cloud & DevOps",
    icon: "📦",
    items: ["AWS", "Docker", "Nginx", "CI/CD"],
  },
  {
    group: "Languages",
    icon: "📜",
    items: ["JavaScript", "TypeScript"],
  },
] as const;

export const EDUCATION = {
  degree: "B.Tech, Mechanical Engineering",
  school: "Meerut Institute of Technology, Meerut",
} as const;
