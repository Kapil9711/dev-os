"use client";

interface Options {
  onResize: (dw: number, dh: number) => void;
}

/** Returns pointer-down handler for a corner resize-handle. */
export function useResizable({ onResize }: Options) {
  function onPointerDown(e: React.PointerEvent) {
    e.preventDefault();
    e.stopPropagation();

    e.currentTarget.setPointerCapture(e.pointerId);

    let lastX = e.clientX;
    let lastY = e.clientY;

    function onMove(ev: PointerEvent) {
      const dw = ev.clientX - lastX;
      const dh = ev.clientY - lastY;

      lastX = ev.clientX;
      lastY = ev.clientY;

      onResize(dw, dh);
    }

    function onUp() {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  return { onPointerDown };
}
