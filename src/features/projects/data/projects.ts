export interface Project {
  name: string;
  desc: string;
  stack: string[];
}

/** Pulled from the "Experience" section of the supplied resume. */
export const PROJECTS: Project[] = [
  {
    name: "Gemlay",
    desc: "Jewellery e-commerce platform with an SEO-optimized Next.js SSR storefront and Elasticsearch-powered product search.",
    stack: ["Next.js", "Elasticsearch", "MongoDB", "Docker", "AWS", "Nginx"],
  },
  {
    name: "Bullion Management Platform",
    desc: "Admin panel, client website, and mobile app for a bullion trading and inventory business with real-time price updates.",
    stack: ["REST APIs", "RBAC", "Real-time Updates", "Docker"],
  },
  {
    name: "Karigar",
    desc: "Worker registration and hiring platform with admin approval workflow, profile verification, and a companion mobile app.",
    stack: ["Backend APIs", "Mobile App", "Notifications"],
  },
  {
    name: "Portfolio OS",
    desc: "This desktop-styled portfolio experience — a windowed operating-system simulation running entirely client-side.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];
