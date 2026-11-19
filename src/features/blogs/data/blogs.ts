import type { Blog } from "../types";

export const BLOGS: Blog[] = [
  {
    id: 1,
    title: "React Query Deep Dive",
    category: "React",
    readTime: "12 min",
    date: "15 Jul 2026",
    content: `# React Query

React Query makes server state simple.

## Features

• Caching

• Background Refetching

• Optimistic Updates

• Infinite Query

## Conclusion

Always prefer React Query over manual fetching.`,
  },
  {
    id: 2,
    title: "Docker Production Guide",
    category: "Docker",
    readTime: "8 min",
    date: "10 Jul 2026",
    content: `# Docker

Build once, deploy anywhere.

## Topics

• Images

• Containers

• Docker Compose

• Volumes`,
  },
  {
    id: 3,
    title: "MongoDB Aggregation",
    category: "MongoDB",
    readTime: "10 min",
    date: "2 Jul 2026",
    content: `# Aggregation

Aggregation is extremely powerful.

Use:

$match

$lookup

$project

$group`,
  },
];
