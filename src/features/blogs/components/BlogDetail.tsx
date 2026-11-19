"use client";

import type { Blog } from "../types";

interface BlogDetailProps {
  blog: Blog;
}

export function BlogDetail({ blog }: BlogDetailProps) {
  return (
    <main className="min-w-0 flex-1 overflow-auto">
      <div className="border-(--color-border) border-b p-4 @3xl:p-6">
        <div className="text-(--color-primary-300) flex flex-wrap items-center gap-2 text-xs @3xl:text-sm">
          <span>{blog.category}</span>
          <span>•</span>
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>

        <h1 className="text-(--color-primary-100) mt-2 text-2xl font-bold leading-tight @3xl:mt-3 @3xl:text-3xl">
          {blog.title}
        </h1>
      </div>

      <article className="p-4 @3xl:p-6">
        <pre className="text-(--color-primary-100) whitespace-pre-wrap break-words font-sans text-sm leading-7 @3xl:text-[15px] @3xl:leading-8">
          {blog.content}
        </pre>
      </article>
    </main>
  );
}
