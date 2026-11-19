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
    <aside className="border-(--color-border) flex h-[280px] w-full flex-col border-b @3xl:h-auto @3xl:w-72 @3xl:border-b-0 @3xl:border-r">
      <div className="border-(--color-border) border-b p-3 @3xl:p-4">
        <div className="relative">
          <Search className="text-(--color-secondary-200-content-1) absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-(--color-border) bg-(--color-secondary-200) h-10 w-full rounded-xl border pl-10 pr-3 text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2 @3xl:p-3">
        {blogs.map((blog) => (
          <button
            key={blog.id}
            type="button"
            onClick={() => onSelectBlog(blog)}
            className={`mb-2 w-full rounded-xl border p-3 text-left transition ${
              selectedId === blog.id
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
  );
}
