"use client";

import { useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

const Highlighter = SyntaxHighlighter as any;

import { COPY_TIMEOUT, LANGUAGE_PREFIX, MERMAID_LANGUAGE } from "../constants";
import type { CodeBlockProps } from "../types";

import Mermaid from "./Mermaid";

export default function CodeBlock({
  inline,
  className,
  children,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const code = String(children ?? "").replace(/\n$/, "");

  const language = className?.replace(LANGUAGE_PREFIX, "") ?? "text";

  if (inline) {
    return (
      <code className="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-neutral-800">
        {children}
      </code>
    );
  }

  if (language === MERMAID_LANGUAGE) {
    return <Mermaid chart={code} />;
  }

  async function copyCode() {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, COPY_TIMEOUT);
  }

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-neutral-800">
      <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 py-2">
        <span className="text-xs uppercase text-neutral-400">{language}</span>

        <button
          onClick={copyCode}
          className="text-xs text-neutral-300 transition hover:text-white"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <Highlighter
        language={language}
        style={nightOwl}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: "#0d1117",
          fontSize: "14px",
        }}
        wrapLongLines
      >
        {code}
      </Highlighter>
    </div>
  );
}
