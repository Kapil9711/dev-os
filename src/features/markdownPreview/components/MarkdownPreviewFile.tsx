"use client";

import { useEffect, useState } from "react";

import { MarkdownPreview } from "@/features/markdownPreview";

export default function MarkdownFilePreview({
  path = "/docs/test.md",
}: {
  path?: string;
}) {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    async function loadMarkdown() {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error("Failed to load markdown");
      }

      const text = await response.text();
      setMarkdown(text);
    }

    loadMarkdown();
  }, [path]);

  return (
    <div className="mx-auto max-w-5xl p-6">
      <MarkdownPreview markdown={markdown} />
    </div>
  );
}
