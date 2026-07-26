"use client";

interface Options {
  onResize: (dw: number, dh: number) => void;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
}

/** Returns pointer-down handler for a corner resize-handle. */
export function useResizable({
  onResize,
  onResizeStart,
  onResizeEnd,
}: Options) {
  function onPointerDown(e: React.PointerEvent) {
    e.preventDefault();
    e.stopPropagation();

    e.currentTarget.setPointerCapture(e.pointerId);

    let lastX = e.clientX;
    let lastY = e.clientY;

    onResizeStart?.();

    function onMove(ev: PointerEvent) {
      const dw = ev.clientX - lastX;
      const dh = ev.clientY - lastY;

      lastX = ev.clientX;
      lastY = ev.clientY;

      onResize(dw, dh);
    }

    function onUp() {
      onResizeEnd?.();

      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  return { onPointerDown };
}
