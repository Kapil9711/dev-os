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

/** Condensed from the resume's Experience section — one role, three shipped platforms. */
export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Vaayro Technologies",
    title: "Software Engineer — Full-Stack (MERN / Next.js)",
    duration: "2 Years",
    summary:
      "Owned features end-to-end across three production platforms — e-commerce, fintech, and marketplace — from database schema to Docker deployment on AWS.",
    projects: [
      {
        name: "Gemlay — Jewellery E-Commerce Platform",
        summary:
          "Production-scale storefront and admin system built from catalog to checkout.",
        highlights: [
          "Shipped SEO-optimized SSR storefront pages with Next.js, improving discoverability and load performance",
          "Built Elasticsearch-powered product search with filtering and ranking for fast, relevant results",
          "Designed and maintained REST APIs powering the storefront, admin panel, and internal services",
          "Built an 8-module admin panel: Products, Orders, Inventory, Coupons, Notifications, Users, CMS, Analytics",
          "Optimized MongoDB queries and indexing strategy, reducing response times under production load",
          "Owned Docker-based deployment on AWS with Nginx as reverse proxy",
        ],
        stack: [
          "Next.js",
          "Elasticsearch",
          "MongoDB",
          "Docker",
          "AWS",
          "Nginx",
        ],
      },
      {
        name: "Bullion Management Platform",
        summary:
          "Real-time trading and inventory system across web, admin, and mobile.",
        highlights: [
          "Built inventory and trading modules supporting real-time price updates and stock tracking",
          "Implemented role-based access control (RBAC) and secure authentication across web and mobile clients",
          "Designed REST APIs powering real-time updates and push notifications across platforms",
          "Containerized services with Docker for consistent, repeatable deployment",
        ],
        stack: ["REST APIs", "RBAC", "Real-time Sync", "Docker"],
      },
      {
        name: "Karigar — Worker Hiring Platform",
        summary: "End-to-end registration, approval, and onboarding workflow.",
        highlights: [
          "Built worker registration and hiring workflow with admin approval steps and profile verification",
          "Developed an admin dashboard and mobile app for end-to-end onboarding management",
          "Designed backend APIs powering registration, approval, and notification flows",
        ],
        stack: ["Backend APIs", "Mobile App", "Notifications"],
      },
    ],
  },
];
