"use client";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_REGISTRY, type AppId } from "@/constants/apps";
import { useWindowManager } from "../context/WindowManagerContext";
import { useDraggable } from "../hooks/useDraggable";
import { useResizable } from "../hooks/useResizable";

interface WindowProps {
  id: AppId;
  children: React.ReactNode;
}

/** A single OS-style window: draggable, resizable, minimize/maximize/close. */
export function Window({ id, children }: WindowProps) {
  const {
    windows,
    focusedId,
    closeWindow,
    finalizeCloseWindow,
    minimizeWindow,
    finalizeMinimizeWindow,
    toggleMaximize,
    focusWindow,
    updateRect,
  } = useWindowManager();
  const win = windows[id];
  const meta = APP_REGISTRY[id];
  const isFocused = focusedId === id;

  const [isDragging, setIsDragging] = useState(false);

  const { onPointerDown: onDragStart } = useDraggable({
    disabled: win?.maximized,
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
    onDrag: (dx, dy) =>
      updateRect(id, (prev) => ({
        x: Math.max(0, prev.x + dx),
        y: Math.max(30, prev.y + dy),
      })),
  });

  const { onPointerDown: onResizeStart } = useResizable({
    onResize: (dw, dh) =>
      updateRect(id, (prev) => ({
        width: Math.max(320, prev.width + dw),
        height: Math.max(220, prev.height + dh),
      })),
  });

  if (!win || win.status === "minimized") {
    return null;
  }

  return (
    <AnimatedWindow
      isDragging={isDragging}
      animate={
        win.status === "closing"
          ? {
              opacity: 0,
              scale: 0.15,
              y: 180,
            }
          : win.status === "minimizing"
            ? {
                opacity: 0,
                scale: 0.2,
                y: 250,
              }
            : {
                opacity: 1,
                scale: 1,
                y: 0,
              }
      }
      onAnimationComplete={() => {
        if (win.status === "closing") {
          finalizeCloseWindow(id);
        }

        if (win.status === "minimizing") {
          finalizeMinimizeWindow(id);
        }
      }}
      className={cn(
        "window-shell",
        isFocused ? "is-focused" : "is-unfocused",
        win.maximized && "!rounded-none",
        "max-[720px]:!inset-0 max-[720px]:!h-full max-[720px]:!w-full max-[720px]:!rounded-none max-[720px]:!border-none",
      )}
      style={{
        left: win.rect.x,
        top: win.rect.y,
        width: win.rect.width,
        height: win.rect.height,
        zIndex: win.zIndex,
      }}
      onPointerDown={() => focusWindow(id)}
    >
      {/* Android-style app bar (mobile only) */}
      <div className="hidden h-10 shrink-0 items-center gap-3.5 border-b border-white/10 bg-[rgba(17,20,32,0.92)] px-1 backdrop-blur-md max-[720px]:flex">
        {/* <button
          type="button"
          aria-label="Back"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full active:bg-white/10"
          onClick={() => closeWindow(id)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="select-none text-[15px] font-bold">
          {<meta.icon />} {meta.title}
        </div> */}
      </div>

      {/* Desktop titlebar */}
      <div
        className="titlebar max-[720px]:hidden"
        style={{
          borderColor: "var(--line)",
          background: "rgba(255,255,255,0.02)",
        }}
        onPointerDown={onDragStart}
      >
        <div className="flex gap-2">
          <TrafficDot
            color="#ff5f57"
            label="Close"
            icon={<X className="h-2.5 w-2.5 stroke-[3] text-black/70" />}
            onClick={() => closeWindow(id)}
          />

          <TrafficDot
            color="#febc2e"
            label="Minimize"
            icon={<Minus className="h-2.5 w-2.5 stroke-[3] text-black/70" />}
            onClick={() => minimizeWindow(id)}
          />

          <TrafficDot
            color="#28c840"
            label="Maximize"
            icon={<Square className="h-2 w-2 stroke-[3] text-black/70" />}
            onClick={() => toggleMaximize(id)}
          />
        </div>
        <div className="mr-[52px] flex flex-1 items-center justify-center gap-2 text-center text-[12.5px] font-semibold text-[var(--text-1)]">
          <span className="select-none text-[13px] opacity-80">
            {<meta.icon />}
          </span>
          {meta.title}
        </div>
      </div>

      <div className="wbody-scroll relative flex-1 overflow-auto">
        {children}
      </div>

      <button
        aria-label="Resize window"
        onPointerDown={onResizeStart}
        className="absolute bottom-0.5 right-0.5 z-10 h-4 w-4 cursor-nwse-resize max-[720px]:hidden"
      >
        <span className="absolute bottom-[3px] right-[3px] h-2 w-2 border-b-2 border-r-2 border-[var(--text-2)] opacity-40" />
      </button>
    </AnimatedWindow>
  );
}

import { Minus, Square, X } from "lucide-react";
import { AnimatedWindow } from "./AnimationWindow";
import { useState } from "react";

function TrafficDot({
  color,
  label,
  icon,
  onClick,
}: {
  color: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="group flex h-3.5 w-3.5 items-center justify-center rounded-full border border-black/15 transition-all duration-150 hover:brightness-110"
      style={{ background: color }}
    >
      <span className="opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {icon}
      </span>
    </button>
  );
}
