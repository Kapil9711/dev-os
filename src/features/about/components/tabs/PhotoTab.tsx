"use client";

import Image from "next/image";
import { DEV } from "@/constants/dev";

export function PhotoTab() {
  return (
    <div
      className="relative h-full overflow-y-auto overflow-x-hidden"
      style={{
        background:
          "repeating-conic-gradient(#0F1219 0% 25%, #0D0F16 0% 50%) center/18px 18px",
      }}
    >
      <div className="relative flex min-h-full items-center justify-center p-4 @3xl:p-6 @5xl:p-8">
        {/* Ambient Glow */}
        <div className="absolute h-[420px] w-[420px] rounded-full bg-[#5B8CFF]/15 blur-[120px]" />

        <div className="relative flex w-full max-w-[520px] flex-col">
          {/* Accent Border */}
          <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-blue-400/30 via-indigo-400/10 to-cyan-400/20 blur-xl" />

          {/* Glass Card */}
          <div className="relative rounded-[28px] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-2xl">
            <Image
              src={DEV.photo}
              alt={DEV.name}
              width={700}
              height={900}
              priority
              className="mx-auto h-auto max-h-[50vh] w-auto max-w-full rounded-[22px] object-contain shadow-[0_30px_80px_rgba(0,0,0,.55)] @3xl:max-h-[58vh] @4xl:max-h-[62vh] @5xl:max-h-[68vh] @7xl:max-h-[720px]"
            />
          </div>

          {/* Caption */}
          <div className="mt-5 hidden rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl @3xl:block">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{DEV.name}</h3>
                <p className="mt-1 text-sm text-[var(--text-2)]">
                  Software Engineer
                </p>
              </div>

              <div className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-1 font-mono text-xs text-blue-300">
                profile.jpg
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
