"use client";

import { useEffect, useRef } from "react";

const HOVER_SELECTOR = "a, button, [data-cursor-hover]";
const LERP = 0.18;

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();

  useEffect(() => {
    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!supportsHover) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function handleMove(e: MouseEvent) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      // dot tracks the pointer exactly — no lag, it's the precision indicator
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    }

    function handleOver(e: MouseEvent) {
      const el = (e.target as HTMLElement)?.closest(HOVER_SELECTOR);
      if (!el || !ringRef.current) return;

      ringRef.current.dataset.hovering = "true";
      const text = el.getAttribute("data-cursor-text");
      if (labelRef.current) labelRef.current.textContent = text ?? "";
    }

    function handleOut(e: MouseEvent) {
      const el = (e.target as HTMLElement)?.closest(HOVER_SELECTOR);
      if (!el || !ringRef.current) return;

      ringRef.current.dataset.hovering = "false";
      if (labelRef.current) labelRef.current.textContent = "";
    }

    function tick() {
      // ring lerps toward the pointer — this is what gives it "weight"
      ring.current.x +=
        (target.current.x - ring.current.x) * (reduceMotion ? 1 : LERP);
      ring.current.y +=
        (target.current.y - ring.current.y) * (reduceMotion ? 1 : LERP);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* precision dot — snaps instantly */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full mix-blend-difference"
        style={{ background: "var(--text-1)" }}
      />

      {/* trailing ring — lerps, scales + shows label on hover */}
      <div
        ref={ringRef}
        data-hovering="false"
        className="fixed left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300 ease-out data-[hovering=true]:h-20 data-[hovering=true]:w-20"
        style={{
          borderColor: "var(--accent)",
          background: "transparent",
        }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[10px] uppercase tracking-[0.15em] opacity-0 transition-opacity duration-200 [[data-hovering=true]_&]:opacity-100"
          style={{ color: "var(--text-1)" }}
        />
      </div>

      <style jsx>{`
        div[data-hovering="true"] {
          background: var(--glass-strong);
          border-color: var(--accent-3);
          backdrop-filter: blur(var(--blur));
        }
      `}</style>
    </div>
  );
}
