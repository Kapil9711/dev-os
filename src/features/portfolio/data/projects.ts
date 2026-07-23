import { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    id: "gemlay",
    title: "Gemlay",
    subtitle: "Jewellery E-commerce Platform",
    year: "2024 - Present",
    featured: true,

    description:
      "Production-scale jewellery e-commerce platform built with a scalable MERN architecture, supporting SEO, advanced product discovery, inventory management, and a complete admin ecosystem.",
    shortDescription:
      "Production-scale jewellery e-commerce platform with SEO-optimized storefront, Elasticsearch search, and a full admin ecosystem.",

    responsibilities: [
      "Developed SEO-optimized storefront using Next.js SSR.",
      "Designed scalable REST APIs for web and admin applications.",
      "Implemented Elasticsearch-powered product search and filtering.",
      "Built complete Admin Panel for products, orders, inventory, coupons, CMS and notifications.",
      "Optimized MongoDB queries and indexing for production workloads.",
      "Improved performance using lazy loading, dynamic imports and caching.",
      "Containerized services with Docker and deployed on AWS using Nginx.",
      "Authored engineering documentation and participated in architecture discussions.",
    ],

    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Elasticsearch",
      "Docker",
      "AWS",
      "Nginx",
    ],
    architecture: [
      "SEO",
      "SSR",
      "REST API",
      "Micro Modules",
      "Admin Dashboard",
      "Search Engine",
    ],

    images: [
      {
        image: "/projects/gemlay/storefront.jpg",
        alt: "Gemlay storefront homepage",
      },
      {
        image: "/projects/gemlay/product.jpg",
        alt: "Gemlay product detail page",
      },
      { image: "/projects/gemlay/admin.jpg", alt: "Gemlay admin dashboard" },
    ],
  },

  {
    id: "bullion",
    title: "Bullion Management Platform",
    subtitle: "Trading & Inventory Management",
    year: "2025",
    featured: true,

    description:
      "Enterprise platform for bullion trading, inventory management and client operations across web and mobile.",
    shortDescription:
      "Enterprise bullion trading and inventory platform with real-time pricing, RBAC, and a companion mobile app.",

    responsibilities: [
      "Developed Admin Panel, website and mobile application.",
      "Implemented inventory and trading workflows.",
      "Designed REST APIs for business operations.",
      "Implemented secure authentication and RBAC.",
      "Integrated real-time updates and push notifications.",
      "Containerized backend using Docker.",
    ],

    technologies: [
      "React",
      "React Native",
      "Node.js",
      "Express",
      "MongoDB",
      "Docker",
    ],
    architecture: ["RBAC", "REST API", "Real-time Updates", "Authentication"],

    images: [
      {
        image: "/projects/bullion/dashboard.jpg",
        alt: "Bullion trading dashboard",
      },
      { image: "/projects/bullion/admin.jpg", alt: "Bullion admin panel" },
      { image: "/projects/bullion/mobile.jpg", alt: "Bullion mobile app" },
    ],
  },

  {
    id: "karigar",
    title: "Karigar",
    subtitle: "Worker Hiring Platform",
    year: "2025",
    featured: true,

    description:
      "Marketplace platform connecting skilled workers with customers through a verified onboarding and approval workflow.",
    shortDescription:
      "Worker marketplace with verified onboarding, admin approval workflow, and a companion mobile app.",

    responsibilities: [
      "Built worker registration workflow.",
      "Designed profile verification system.",
      "Developed admin approval dashboard.",
      "Created backend APIs for onboarding.",
      "Implemented notification workflows.",
      "Built supporting mobile application.",
    ],

    technologies: ["React Native", "Node.js", "Express", "MongoDB"],
    architecture: [
      "Approval Workflow",
      "Notifications",
      "Mobile App",
      "REST API",
    ],

    images: [
      {
        image: "/projects/karigar/onboarding.jpg",
        alt: "Karigar worker onboarding flow",
      },
      {
        image: "/projects/karigar/admin.jpg",
        alt: "Karigar admin approval dashboard",
      },
      { image: "/projects/karigar/mobile.jpg", alt: "Karigar mobile app" },
    ],
  },
];
