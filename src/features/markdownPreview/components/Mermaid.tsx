"use client";

import { useEffect, useRef } from "react";

import mermaid from "mermaid";

import { MERMAID_THEME } from "../constants";
import type { MermaidProps } from "../types";

let initialized = false;

function initializeMermaid() {
  if (initialized) return;

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: MERMAID_THEME,
  });

  initialized = true;
}

export default function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeMermaid();

    async function renderChart() {
      if (!containerRef.current) return;

      const id = `mermaid-${crypto.randomUUID()}`;

      try {
        const { svg } = await mermaid.render(id, chart.trim());

        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.error(error);

        containerRef.current.innerHTML = `
          <pre style="
            color:#ef4444;
            background:#1f2937;
            padding:16px;
            border-radius:8px;
            overflow:auto;
          ">
${chart}
          </pre>
        `;
      }
    }

    renderChart();
  }, [chart]);

  return (
    <div className="my-6 overflow-auto rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
      <div ref={containerRef} />
    </div>
  );
}
