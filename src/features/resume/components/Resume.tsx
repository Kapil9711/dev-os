"use client";

import { useEffect, useState } from "react";
import { useWindowManager } from "@/features/window-manager";
import type { ResumeTab } from "../types";
import { ResumeToolbar } from "./ResumeToolbar";
import { ResumeMarkdownView } from "./ResumeMarkdownView";
import { ResumePdfView } from "./ResumePdfView";

export function Resume() {
  const [tab, setTab] = useState<ResumeTab>("pdf");
  const { windows } = useWindowManager();
  const win = windows?.["resume"];

  // useEffect(() => {
  //   const state = win?.state as { activeTab?: string } | undefined;
  //   if (state?.activeTab === "pdf") {
  //     setTab("pdf");
  //   } else {
  //     setTab("md");
  //   }
  // }, [win?.state]);

  return (
    <div className="flex h-full flex-col pb-10 sm:pb-0">
      <ResumeToolbar activeTab={tab} onTabChange={setTab} />
      <div className="flex-1 overflow-auto px-2">
        {tab === "md" ? <ResumeMarkdownView /> : <ResumePdfView />}
      </div>
    </div>
  );
}

export default Resume;
