"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { ResumeTab } from "../types";
import { downloadMarkdownResume, downloadPdfResume } from "../utils/download";

interface ResumeToolbarProps {
  activeTab: ResumeTab;
  onTabChange: (tab: ResumeTab) => void;
}

export function ResumeToolbar({ activeTab, onTabChange }: ResumeToolbarProps) {
  return (
    <div className="flex items-center gap-1 border-b border-white/10 px-2 py-2 print:hidden">
      <button
        type="button"
        onClick={() => onTabChange("pdf")}
        className={cn(
          "hidden rounded-lg px-3 py-1.5 text-xs @3xl:block",
          activeTab === "pdf"
            ? "bg-white/[0.06] font-semibold text-[var(--text-1)]"
            : "text-[var(--text-2)]",
        )}
      >
        📄 Resume.pdf
      </button>

      <div className="ml-auto flex gap-2">
        {/* <Button className="hidden @3xl:block" onClick={downloadMarkdownResume}>
          ⬇ .md
        </Button> */}
        <Button variant="primary" onClick={downloadPdfResume}>
          ⬇ Download PDF
        </Button>
      </div>
    </div>
  );
}
