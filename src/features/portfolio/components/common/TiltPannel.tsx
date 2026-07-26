"use client";

import { useState, type ReactNode, type MouseEvent } from "react";

import GlassCard from "../common/GlassCard";

/**
 * Same hover-tilt treatment as Hero's portrait card (see `TiltCard` in
 * Hero.tsx), generalized to wrap arbitrary content instead of a single
 * image. Disabled on touch devices via the same
 * `(hover: hover) and (pointer: fine)` check, so it never fights a
 * finger drag on mobile.
 */
export default function TiltPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [tiltEnabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!tiltEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    // Slightly gentler than the hero portrait's +-8deg -- these are
    // text-bearing cards, not a single focal image, so a lighter tilt
    // keeps the copy comfortable to read while still moving.
    setTilt({ x: py * -6, y: px * 6 });
  }

  return (
    <div
      className="relative [perspective:1200px]"
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <GlassCard
        className={`p-6 transition-transform duration-300 ease-out sm:p-7 ${className}`}
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        {children}
      </GlassCard>
    </div>
  );
}
