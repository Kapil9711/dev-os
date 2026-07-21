"use client";

import { DESKTOP_APPS, APP_REGISTRY } from "@/constants/apps";
import { useWindowManager } from "@/features/window-manager/context/WindowManagerContext";

const LABELS: Record<string, string> = {
  resume: "Resume.pdf",
  projects: "Projects",
  contact: "Contact.app",
};

export function DesktopIcons() {
  const { openWindow } = useWindowManager();

  return (
    <div className="fixed right-5 top-14 z-10 flex flex-col items-center gap-2 max-[720px]:hidden">
      {DESKTOP_APPS.map((id) => {
        const app = APP_REGISTRY[id];

        return (
          <button
            key={id}
            type="button"
            onClick={() => {
              openWindow(app.id);
            }}
            className="group w-24 rounded-2xl px-2 py-2 text-center transition-all duration-200 hover:bg-white/5 focus:outline-none"
          >
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-accent/25 via-accent-2/20 to-accent/10 shadow-lg transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl">
              <div className="text-white">{<app.icon />}</div>
            </div>

            <div className="rounded-md px-1 py-0.5 text-[11px] font-medium text-[var(--text-1)] [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
              {LABELS[id]}
            </div>
          </button>
        );
      })}
    </div>
  );
}
