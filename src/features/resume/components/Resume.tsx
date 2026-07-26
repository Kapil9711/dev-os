"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

import { buildResumeMarkdown } from "../data/resume";
import MarkdownFilePreview from "@/features/markdownPreview/components/MarkdownPreviewFile";
import { useWindowManager } from "@/features/window-manager";

type Tab = "md" | "pdf";

export function Resume() {
  const [tab, setTab] = useState<Tab>("md");

  function handlePrintResume() {
    const iframe = document.createElement("iframe");

    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";

    iframe.src = "/resume.html";

    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();

      iframe.contentWindow?.addEventListener("afterprint", () => {
        iframe.remove();
      });
    };

    document.body.appendChild(iframe);
  }
  const { windows } = useWindowManager();
  const win = windows?.["resume"];

  useEffect(() => {
    const state: any = win?.state;
    if (state?.activeTab == "pdf") {
      setTab("pdf");
    } else {
      setTab("md");
    }
  }, [win?.state]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1 border-b border-white/10 px-2 py-2 print:hidden">
        <TabButton active={tab === "md"} onClick={() => setTab("md")}>
          📘 Resume.md
        </TabButton>
        <TabButton active={tab === "pdf"} onClick={() => setTab("pdf")}>
          📄 Resume.pdf
        </TabButton>
        <div className="ml-auto flex gap-2">
          <Button onClick={downloadMarkdown}>⬇ .md</Button>
          <Button variant="primary" onClick={handlePrintResume}>
            ⬇ Download PDF
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto px-2">
        {tab === "md" ? <MarkdownView /> : <PdfPreview />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-1.5 text-xs",
        active
          ? "bg-white/[0.06] font-semibold text-[var(--text-1)]"
          : "text-[var(--text-2)]",
      )}
    >
      {children}
    </button>
  );
}

function MarkdownView() {
  return <MarkdownFilePreview path="/docs/resume.md" />;
}

function PdfPreview() {
  return (
    <iframe
      title="Kapil Rajput — Portfolio"
      src="/resume.html"
      className="h-full w-full border-0"
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    />
  );
}

function downloadMarkdown() {
  const blob = new Blob([buildResumeMarkdown()], { type: "text/markdown" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "Kapil_Rajput_Resume.md";
  a.click();
  URL.revokeObjectURL(a.href);
}
