"use client";

import { useMemo, useState } from "react";
import { Search, Clock3, FileText, ChevronRight } from "lucide-react";

type Blog = {
  id: number;
  title: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
};

const BLOGS: Blog[] = [
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

export default function BlogsWindow() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(BLOGS[0] as any);

  const filtered = useMemo(() => {
    return BLOGS.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div className="border-(--color-border) bg-(--background) flex h-full flex-col overflow-hidden rounded-2xl border @3xl:flex-row">
      {/* Sidebar */}

      <aside className="border-(--color-border) flex h-[280px] w-full flex-col border-b @3xl:h-auto @3xl:w-72 @3xl:border-b-0 @3xl:border-r">
        <div className="border-(--color-border) border-b p-3 @3xl:p-4">
          <div className="relative">
            <Search className="text-(--color-secondary-200-content-1) absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />

            <input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-(--color-border) bg-(--color-secondary-200) h-10 w-full rounded-xl border pl-10 pr-3 text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-2 @3xl:p-3">
          {filtered.map((blog) => (
            <button
              key={blog.id}
              onClick={() => setSelected(blog)}
              className={`mb-2 w-full rounded-xl border p-3 text-left transition ${
                selected.id === blog.id
                  ? "border-(--color-golden) bg-(--color-base-200)"
                  : "hover:border-(--color-border) border-transparent"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <FileText
                    size={15}
                    className="text-(--color-primary-300) shrink-0"
                  />

                  <span className="truncate text-sm font-semibold">
                    {blog.title}
                  </span>
                </div>

                <ChevronRight size={15} className="shrink-0" />
              </div>

              <div className="text-(--color-secondary-200-content-1) mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                <span>{blog.category}</span>

                <span>•</span>

                <div className="flex items-center gap-1">
                  <Clock3 size={11} />

                  {blog.readTime}
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Content */}

      <main className="min-w-0 flex-1 overflow-auto">
        <div className="border-(--color-border) border-b p-4 @3xl:p-6">
          <div className="text-(--color-primary-300) flex flex-wrap items-center gap-2 text-xs @3xl:text-sm">
            <span>{selected.category}</span>

            <span>•</span>

            <span>{selected.date}</span>

            <span>•</span>

            <span>{selected.readTime}</span>
          </div>

          <h1 className="text-(--color-primary-100) mt-2 text-2xl font-bold leading-tight @3xl:mt-3 @3xl:text-3xl">
            {selected.title}
          </h1>
        </div>

        <article className="p-4 @3xl:p-6">
          <pre className="text-(--color-primary-100) whitespace-pre-wrap break-words font-sans text-sm leading-7 @3xl:text-[15px] @3xl:leading-8">
            {selected.content}
          </pre>
        </article>
      </main>
    </div>
  );
}
