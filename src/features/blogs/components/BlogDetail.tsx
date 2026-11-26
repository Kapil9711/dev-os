"use client";

import type { Blog } from "../types";

interface BlogDetailProps {
  blog: Blog;
}

export function BlogDetail({ blog }: BlogDetailProps) {
  return (
    <main className="wbody-scroll min-w-0 flex-1 overflow-auto">
      <div className="border-b border-cyan-500/15 p-5 @3xl:p-7">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-cyan-400">
          <span className="rounded border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 font-bold uppercase tracking-wider text-[10px]">
            {blog.category}
          </span>
          <span>•</span>
          <span className="text-slate-400">{blog.date}</span>
          <span>•</span>
          <span className="text-slate-400">{blog.readTime}</span>
        </div>

        <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-cyan-100 @3xl:mt-4 @3xl:text-3xl">
          {blog.title}
        </h1>
      </div>

      <article className="p-5 @3xl:p-7">
        <div className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-slate-200 @3xl:text-[15px] @3xl:leading-8">
          {blog.content}
        </div>
      </article>
    </main>
  );
}
