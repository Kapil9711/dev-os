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
    theme: "redux-dark-color",
    themeVariables: {
      background: "#0B1020",

      primaryColor: "#182235",
      primaryBorderColor: "#3B82F6",
      primaryTextColor: "#F8FAFC",

      secondaryColor: "#111827",
      tertiaryColor: "#0F172A",

      textColor: "#F8FAFC",

      lineColor: "#5FA8FF",

      clusterBkg: "#151E2E",
      clusterBorder: "#3B82F6",

      edgeLabelBackground: "#0B1020",

      noteBkgColor: "#1E293B",
      noteBorderColor: "#60A5FA",

      fontFamily: "Inter",
      fontSize: "15px",

      // Sequence Diagram
      actorBkg: "#182235",
      actorBorder: "#3B82F6",
      actorTextColor: "#F8FAFC",

      activationBkgColor: "#3B82F6",
      activationBorderColor: "#60A5FA",

      signalColor: "#60A5FA",
      signalTextColor: "#F8FAFC",

      labelBoxBkgColor: "#182235",
      labelBoxBorderColor: "#3B82F6",

      loopTextColor: "#F8FAFC",

      // Class Diagram
      classBkg: "#182235",
      classBorder: "#3B82F6",
      classText: "#F8FAFC",

      // State Diagram
      stateBkg: "#182235",
      stateBorder: "#3B82F6",

      // Journey
      fillType0: "#3B82F6",
      fillType1: "#8B5CF6",
      fillType2: "#06B6D4",
      fillType3: "#10B981",
      fillType4: "#F59E0B",

      // Pie
      pie1: "#3B82F6",
      pie2: "#8B5CF6",
      pie3: "#06B6D4",
      pie4: "#10B981",
      pie5: "#F59E0B",
    },
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
