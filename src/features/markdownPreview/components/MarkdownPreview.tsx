"use client";

import clsx from "clsx";

import { MARKDOWN_PREVIEW_CLASS } from "../constants";
import type { MarkdownPreviewProps } from "../types";

import MarkdownRenderer from "./MarkdownRenderer";

export default function MarkdownPreview({
  markdown,
  className,
}: MarkdownPreviewProps) {
  return (
    <div
      className={clsx(
        MARKDOWN_PREVIEW_CLASS,
        "w-full overflow-x-auto",
        className,
      )}
    >
      <MarkdownRenderer markdown={markdown} />
    </div>
  );
}
