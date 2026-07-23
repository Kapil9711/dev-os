"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollProgressProps {
  /** id of the scrollable ancestor this bar tracks. Falls back to the
   *  window if not found, so this still works on pages that don't use
   *  a custom scroll container. */
  containerId?: string;
}

export default function ScrollProgress({
  containerId = "window-container-portfolio",
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const container = document.getElementById(containerId);
    // Use the container's own scrolling if it exists; otherwise fall back
    // to the window so this component isn't dead outside that layout.
    const scrollEl: HTMLElement | Window = container ?? window;

    function update() {
      const scrollTop = container ? container.scrollTop : window.scrollY;
      const scrollHeight = container
        ? container.scrollHeight - container.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight;

      const percentage =
        scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, percentage)));
      tickingRef.current = false;
    }

    function onScroll() {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(update);
    }

    update();
    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      scrollEl.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [containerId]);

  return (
    <div className="sticky left-0 top-0 z-[9999] h-1 w-full bg-transparent">
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-[width] duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
