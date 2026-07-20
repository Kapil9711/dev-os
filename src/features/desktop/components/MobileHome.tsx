"use client";

import Image from "next/image";
import { DOCK_APPS, APP_REGISTRY, type AppId } from "@/constants/apps";
import { DEV } from "@/constants/dev";
import { useWindowManager } from "@/features/window-manager/context/WindowManagerContext";

const HOME_APPS: AppId[] = [...DOCK_APPS, "settings"];

export function MobileHome({
  visible,
  onOpenSpotlight,
}: {
  visible: boolean;
  onOpenSpotlight: () => void;
}) {
  const { openWindow } = useWindowManager();

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-20 hidden flex-col px-[22px] pb-24 pt-[52px] max-[720px]:flex">
      <div className="mb-[18px] mt-1.5">
        <div className="text-[22px] font-extrabold">Hi, Recruiter 👋</div>
        <div className="mt-0.5 text-[12.5px] text-[var(--text-2)]">
          kapOS · tap an app to open
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenSpotlight}
        className="glass-panel mb-[26px] flex items-center gap-2.5 rounded-[28px] px-4 py-3 text-left text-[13.5px] text-[var(--text-2)]"
      >
        🔍 Search vaibOS…
      </button>

      <div className="grid grid-cols-4 gap-x-2 gap-y-[22px]">
        {HOME_APPS.map((id) => {
          const Icon = APP_REGISTRY[id]?.icon;
          return (
            <button
              key={id}
              type="button"
              onClick={() => openWindow(id)}
              className="text-center active:[&>div]:scale-90"
            >
              <div className="mx-auto mb-1.5 flex h-[58px] w-[58px] items-center justify-center rounded-[20px] border border-white/10 bg-gradient-to-br from-accent/30 to-accent-2/[0.18] text-[25px] shadow-[0_8px_18px_rgba(0,0,0,0.35)] transition-transform">
                <Icon />
              </div>
              <div className="truncate text-[11px] text-[var(--text-1)]">
                {APP_REGISTRY[id].title.split(" — ")[0]}
              </div>
            </button>
          );
        })}
      </div>

      <div className="glass-panel mt-auto flex items-center gap-3 rounded-[22px] p-4">
        <Image
          src={DEV.photo}
          alt={DEV.name}
          width={44}
          height={44}
          className="rounded-[14px] border border-white/10 object-cover"
        />
        <div>
          <div className="text-[12.5px] font-bold">{DEV.name}</div>
          <div className="text-[11px] text-[var(--text-2)]">
            {DEV.role} · Open to opportunities
          </div>
        </div>
      </div>
    </div>
  );
}
