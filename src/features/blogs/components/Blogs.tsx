"use client";

import { useMemo, useState } from "react";
import { BLOGS } from "../data/blogs";
import type { Blog } from "../types";
import { BlogSidebar } from "./BlogSidebar";
import { BlogDetail } from "./BlogDetail";

export function BlogsWindow() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Blog>(BLOGS[0] ?? {
    id: 0,
    title: "",
    category: "",
    readTime: "",
    date: "",
    content: "",
  });

  const filtered = useMemo(() => {
    return BLOGS.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div className="border-(--color-border) bg-(--background) flex h-full flex-col overflow-hidden rounded-2xl border @3xl:flex-row">
      <BlogSidebar
        blogs={filtered}
        selectedId={selected.id}
        search={search}
        onSearchChange={setSearch}
        onSelectBlog={setSelected}
      />
      <BlogDetail blog={selected} />
    </div>
  );
}

export default BlogsWindow;
