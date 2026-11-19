"use client";

import { useState } from "react";
import Image from "next/image";
import { PROFILE } from "../../data";
import GlassCard from "../common/GlassCard";

export function HeroTiltCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [tiltEnabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!tiltEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  }

  return (
    <div
      className="relative [perspective:1200px]"
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <GlassCard
        className="overflow-hidden p-4 transition-transform duration-300 ease-out @5xl:p-5"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl @5xl:rounded-3xl">
          <Image
            src={PROFILE.avatar}
            alt={PROFILE.name}
            fill
            priority
            sizes="(min-width: 1280px) 500px, (min-width: 1024px) 420px, (min-width: 640px) 420px, 100vw"
            className="object-cover"
          />
        </div>
      </GlassCard>

      <div
        className="pointer-events-none absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-full opacity-25 blur-[90px] @5xl:-left-10 @5xl:-top-10 @5xl:h-56 @5xl:w-56 @5xl:blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--accent), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-full opacity-25 blur-[90px] @5xl:-bottom-10 @5xl:-right-10 @5xl:h-56 @5xl:w-56 @5xl:blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--accent-3), transparent 70%)",
        }}
      />
    </div>
  );
}
