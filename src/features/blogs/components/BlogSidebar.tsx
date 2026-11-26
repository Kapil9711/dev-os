"use client";

import { Search, FileText, ChevronRight, Clock3 } from "lucide-react";
import type { Blog } from "../types";

interface BlogSidebarProps {
  blogs: Blog[];
  selectedId: number;
  search: string;
  onSearchChange: (query: string) => void;
  onSelectBlog: (blog: Blog) => void;
}

export function BlogSidebar({
  blogs,
  selectedId,
  search,
  onSearchChange,
  onSelectBlog,
}: BlogSidebarProps) {
  return (
    <aside className="flex h-[280px] w-full flex-col border-b border-cyan-500/15 @3xl:h-auto @3xl:w-80 @3xl:border-b-0 @3xl:border-r select-none">
      <div className="border-b border-cyan-500/15 p-3.5 @3xl:p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-cyan-400/70" />
          <input
            placeholder="Search articles & logs..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-9 w-full rounded-xl border border-cyan-500/20 bg-cyan-950/20 pl-9 pr-3 font-mono text-[12.5px] text-cyan-100 placeholder-cyan-500/40 outline-none transition focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,240,255,0.25)]"
          />
        </div>
      </div>

      <div className="wbody-scroll flex-1 overflow-auto p-2.5 @3xl:p-3">
        {blogs.map((blog) => (
          <button
            key={blog.id}
            type="button"
            onClick={() => onSelectBlog(blog)}
            className={`mb-2 w-full rounded-xl border p-3.5 text-left transition-all duration-150 ${
              selectedId === blog.id
                ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-100 shadow-[0_0_12px_rgba(0,240,255,0.18)]"
                : "border-transparent text-slate-300 hover:border-cyan-500/20 hover:bg-cyan-500/10 hover:text-cyan-200"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <FileText
                  size={14}
                  className="shrink-0 text-cyan-400"
                />
                <span className="truncate text-[13px] font-semibold">
                  {blog.title}
                </span>
              </div>
              <ChevronRight size={14} className="shrink-0 text-cyan-400/50" />
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[10.5px] text-cyan-400/70">
              <span className="rounded bg-cyan-500/10 px-1.5 py-0.5">{blog.category}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock3 size={11} />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
