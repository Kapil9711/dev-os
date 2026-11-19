"use client";

import { PROFILE } from "../../data";
import GlassCard from "../common/GlassCard";

export function HeroStats() {
  return (
    <div className="mt-10 grid grid-cols-3 gap-2.5 @5xl:mt-14 @5xl:gap-4">
      <GlassCard className="p-3 text-center transition-transform duration-300 hover:-translate-y-1 @5xl:p-6">
        <h3
          className="text-xl font-bold @5xl:text-2xl @7xl:text-4xl"
          style={{ color: "var(--text-1)" }}
        >
          {PROFILE.experience}+
        </h3>
        <p
          className="mt-1 text-[11px] @5xl:mt-2 @5xl:text-sm"
          style={{ color: "var(--text-2)" }}
        >
          Years
        </p>
      </GlassCard>

      <GlassCard className="p-3 text-center transition-transform duration-300 hover:-translate-y-1 @5xl:p-6">
        <h3
          className="text-xl font-bold @5xl:text-2xl @7xl:text-4xl"
          style={{ color: "var(--text-1)" }}
        >
          20+
        </h3>
        <p
          className="mt-1 text-[11px] @5xl:mt-2 @5xl:text-sm"
          style={{ color: "var(--text-2)" }}
        >
          Projects
        </p>
      </GlassCard>

      <GlassCard className="p-3 text-center transition-transform duration-300 hover:-translate-y-1 @5xl:p-6">
        <h3
          className="text-xl font-bold @5xl:text-2xl @7xl:text-4xl"
          style={{ color: "var(--text-1)" }}
        >
          100%
        </h3>
        <p
          className="mt-1 text-[11px] @5xl:mt-2 @5xl:text-sm"
          style={{ color: "var(--text-2)" }}
        >
          Passion
        </p>
      </GlassCard>
    </div>
  );
}
