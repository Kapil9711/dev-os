"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { ResumeTab } from "../types";
import { downloadMarkdownResume, downloadPdfResume } from "../utils/download";
import { FileText, Download } from "lucide-react";

interface ResumeToolbarProps {
  activeTab: ResumeTab;
  onTabChange: (tab: ResumeTab) => void;
}

export function ResumeToolbar({ activeTab, onTabChange }: ResumeToolbarProps) {
  return (
    <div className="flex items-center gap-2 border-b border-cyan-500/15 px-4 py-2.5 print:hidden select-none">
      <button
        type="button"
        onClick={() => onTabChange("pdf")}
        className={cn(
          "hidden items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs @3xl:flex transition",
          activeTab === "pdf"
            ? "border border-cyan-400/35 bg-cyan-500/15 font-bold text-cyan-100 shadow-[0_0_10px_rgba(0,240,255,0.15)]"
            : "text-slate-400 hover:text-cyan-200 hover:bg-cyan-500/10",
        )}
      >
        <FileText size={13} className="text-cyan-400" />
        <span>Resume.pdf</span>
      </button>

      <div className="ml-auto flex items-center gap-2.5">
        {/* <Button className="hidden @3xl:block" onClick={downloadMarkdownResume}>
          ⬇ .md
        </Button> */}
        <Button variant="primary" onClick={downloadPdfResume} className="flex items-center gap-1.5 font-mono text-xs">
          <Download size={13} />
          <span>Download PDF</span>
        </Button>
      </div>
    </div>
  );
}
