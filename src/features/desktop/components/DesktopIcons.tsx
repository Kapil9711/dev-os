"use client";

import { DESKTOP_APPS, APP_REGISTRY } from "@/constants/apps";
import { useWindowManager } from "@/features/window-manager/context/WindowManagerContext";

const LABELS: Record<string, string> = {
  resume: "Resume",
  portfolio: "Portfolio",
  terminal: "Terminal",
  thoughtProcess: "Thought Process",
};

export function DesktopIcons() {
  const { openWindow } = useWindowManager();

  return (
    <div className="fixed right-6 top-16 z-10 flex flex-col items-center gap-3.5 max-[720px]:hidden select-none">
      {DESKTOP_APPS.map((id) => {
        const app = APP_REGISTRY[id];
        if (!app) return null;
        const Icon = app.icon;
        const label = LABELS[id] ?? app.title.split(" — ")[0];

        return (
          <button
            key={id}
            type="button"
            onClick={() => {
              openWindow(app.id);
            }}
            className="group flex w-24 flex-col items-center rounded-2xl p-2 text-center transition-all duration-200 hover:bg-cyan-500/10 focus:outline-none"
          >
            <div className="desktop-icon-badge mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.45)]">
              <div className="text-cyan-200 transition-colors duration-200 group-hover:text-cyan-50">
                <Icon size={26} />
              </div>
            </div>

            <div className="rounded-md border border-cyan-500/20 bg-[#030611]/80 px-2 py-0.5 font-mono text-[10.5px] font-medium tracking-wide text-cyan-100 shadow-md backdrop-blur-md transition-colors duration-200 group-hover:border-cyan-400 group-hover:text-cyan-200">
              {label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
