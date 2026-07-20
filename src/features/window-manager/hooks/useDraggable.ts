"use client";

import { useRef } from "react";

interface Options {
  disabled?: boolean;
  onDrag: (dx: number, dy: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

/** Returns pointer-down handler that tracks drag deltas until pointer-up. */
export function useDraggable({
  disabled,
  onDrag,
  onDragStart,
  onDragEnd,
}: Options) {
  const origin = useRef<{ x: number; y: number } | null>(null);

  function onPointerDown(e: React.PointerEvent) {
    if (disabled) return;

    origin.current = {
      x: e.clientX,
      y: e.clientY,
    };

    onDragStart?.();

    function onMove(ev: PointerEvent) {
      if (!origin.current) return;

      const dx = ev.clientX - origin.current.x;
      const dy = ev.clientY - origin.current.y;

      origin.current = {
        x: ev.clientX,
        y: ev.clientY,
      };

      onDrag(dx, dy);
    }

    function onUp() {
      origin.current = null;

      onDragEnd?.();

      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  return { onPointerDown };
}
