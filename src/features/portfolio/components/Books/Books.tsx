import React from "react";
import CircularGallery from "../common/CircularGallery";
import { books } from "../../constants/books";
import PrismaticBurst from "../common/PrismaBurst";
import SideRays from "../common/SideRays";
import LightRays from "../common/LightRays";
import { useWindowManager } from "@/features/window-manager";

export const Books = () => {
  const { hasMaximizedWindow } = useWindowManager();
  return (
    <section className="py-5">
      <div
        style={{ width: "100%", height: "700px", position: "absolute" }}
        className="hidden @3xl:block"
      >
        <SideRays
          speed={2}
          rayColor1="#9b7eff"
          rayColor2="#9b7eff"
          intensity={1.5}
          spread={1.5}
          origin="top-right"
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1}
        />
      </div>

      <div style={{ width: "100%", height: "700px", position: "absolute" }}>
        <SideRays
          speed={2}
          rayColor1="#6c63ff"
          rayColor2="#9b7eff"
          intensity={1.5}
          spread={1.5}
          origin="top-left"
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1}
        />
      </div>
      <div className="container mx-auto flex flex-col items-center px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="inline-block rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide"
            style={{
              borderColor: "var(--line)",
              background: "var(--glass)",
              color: "var(--accent-3)",
            }}
          >
            Learning Journey
          </span>

          <h2
            className="mt-5 text-2xl font-bold @3xl:text-3xl @5xl:text-4xl"
            style={{ color: "var(--text-1)" }}
          >
            Books That Shaped My Engineering Mindset
          </h2>

          <p
            className="mt-4 text-sm leading-relaxed @3xl:text-base"
            style={{ color: "var(--text-2)" }}
          >
            Continuous learning is a core part of my growth. These books have
            influenced how I write code, design scalable systems, solve
            problems, and think like a software engineer.
          </p>
        </div>

        <div className="mx-auto mt-8 flex h-[420px] w-full max-w-6xl items-center justify-center @3xl:h-[480px] @5xl:h-[520px]">
          <CircularGallery
            items={books}
            bend={3}
            borderRadius={0.08}
            scrollEase={0.03}
          />
        </div>
      </div>
    </section>
  );
};
