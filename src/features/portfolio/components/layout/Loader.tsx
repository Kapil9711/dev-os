"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const MIN_DISPLAY_MS = 1100;

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const startTime = useRef(Date.now());

  useEffect(() => {
    let rafId: number;
    let done = false;

    // climbs quickly toward ~92% on its own, then waits for the real
    // window "load" event to close the gap — never fakes 100% early,
    // never stalls forever if load is slow either.
    function tick() {
      setProgress((prev) => {
        if (done) return prev;
        const next = prev + (92 - prev) * 0.06;
        return next;
      });
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    function finish() {
      done = true;
      cancelAnimationFrame(rafId);
      setProgress(100);

      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(MIN_DISPLAY_MS - elapsed, 0);
      setTimeout(() => setLoading(false), remaining);
    }

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", finish);
    };
  }, []);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[9999] flex items-center justify-center",
        "transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]",
        loading
          ? "opacity-100"
          : "pointer-events-none scale-105 opacity-0 blur-md",
      )}
      style={{ background: "var(--bg-void)" }}
    >
      {/* soft ambient glow behind the mark, on-brand instead of flat black */}
      <div
        className="pointer-events-none absolute h-[420px] w-[420px] rounded-full opacity-30 blur-[130px]"
        style={{
          background: "radial-gradient(circle, var(--accent), transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-7">
        <div className="relative h-14 w-14">
          <div
            className="absolute inset-0 rounded-full border-2 opacity-20"
            style={{ borderColor: "var(--text-2)" }}
          />
          <div
            className="absolute inset-0 animate-spin rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "var(--accent)",
              borderRightColor: "var(--accent-3)",
              animationDuration: "0.9s",
            }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center font-mono text-[11px] tabular-nums"
            style={{ color: "var(--text-1)" }}
          >
            {Math.round(progress)}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.4em]"
            style={{ color: "var(--text-2)" }}
          >
            Loading
          </p>

          <div
            className="h-px w-40 overflow-hidden rounded-full"
            style={{ background: "var(--line)" }}
          >
            <div
              className="h-full rounded-full transition-[width] duration-150 ease-out"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
