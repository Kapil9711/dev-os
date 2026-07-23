import React from "react";
import CircularGallery from "../common/CircularGallery";
import { books } from "../../constants/books";
import PrismaticBurst from "../common/PrismaBurst";
import SideRays from "../common/SideRays";
import LightRays from "../common/LightRays";

export const Books = () => {
  return (
    <section className="py-5">
      <div style={{ width: "100%", height: "700px", position: "absolute" }}>
        <SideRays
          speed={2.5}
          rayColor1="#EAB308"
          rayColor2="#96c8ff"
          intensity={2}
          spread={2}
          origin="top-right"
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
            Recommended Reading
          </span>

          <h2
            className="mt-5 text-2xl font-bold sm:text-3xl lg:text-4xl"
            style={{ color: "var(--text-1)" }}
          >
            Books Every Software Engineer Should Read
          </h2>

          <p
            className="mt-4 text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--text-2)" }}
          >
            Build strong fundamentals in software engineering, system design,
            clean architecture, databases, distributed systems, and programming
            best practices.
          </p>
        </div>

        <div className="mx-auto mt-8 flex h-[420px] w-full max-w-6xl items-center justify-center border border-white sm:h-[480px] lg:h-[520px]">
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
