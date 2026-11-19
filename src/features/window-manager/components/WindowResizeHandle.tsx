"use client";

interface WindowResizeHandleProps {
  onResizeStart: (e: React.PointerEvent) => void;
}

export function WindowResizeHandle({
  onResizeStart,
}: WindowResizeHandleProps) {
  return (
    <button
      type="button"
      aria-label="Resize window"
      onPointerDown={onResizeStart}
      className="absolute bottom-0.5 right-0.5 z-10 h-4 w-4 cursor-nwse-resize max-[720px]:hidden"
    >
      <span className="absolute bottom-[3px] right-[3px] h-2 w-2 border-b-2 border-r-2 border-[var(--text-2)] opacity-40" />
    </button>
  );
}
