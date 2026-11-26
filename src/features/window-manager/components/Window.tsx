"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { APP_REGISTRY, type AppId } from "@/constants/apps";
import { useWindowManager } from "../context/WindowManagerContext";
import { useDraggable } from "../hooks/useDraggable";
import { useResizable } from "../hooks/useResizable";
import { AnimatedWindow } from "./AnimationWindow";
import { WindowTitleBar } from "./WindowTitleBar";
import { WindowResizeHandle } from "./WindowResizeHandle";

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
    setWindows,
  } = useWindowManager();

  const win = windows[id];
  const meta = APP_REGISTRY[id];
  const isFocused = focusedId === id;

  const [isDragging, setIsDragging] = useState(false);
  const [, setIsResizing] = useState(false);
  const [showContent, setShowContent] = useState(false);

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
    onResizeStart: () => setIsResizing(true),
    onResizeEnd: () => setIsResizing(false),
    onResize: (dw, dh) => {
      if (!win?.maximized) {
        updateRect(id, (prev) => ({
          width: Math.max(320, prev.width + dw),
          height: Math.max(220, prev.height + dh),
        }));
      }
    },
  });

  useEffect(() => {
    if (win?.status === "open") {
      const frameId = requestAnimationFrame(() => {
        const timer = setTimeout(() => {
          setShowContent(true);
        }, 180);
        return () => clearTimeout(timer);
      });
      return () => cancelAnimationFrame(frameId);
    }
    setShowContent(false);
  }, [win?.status]);

  useEffect(() => {
    const handleResize = () => {
      setWindows((prev) => {
        const next = { ...prev };

        for (const appId in next) {
          const w = next[appId];
          if (!w || !w.maximized) continue;

          next[appId] = {
            ...w,
            rect: {
              ...w.rect,
              width: window.innerWidth,
              height: window.innerHeight,
            },
          };
        }

        return next;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWindows]);

  if (!win || win.status === "minimized" || !meta) {
    return null;
  }

  const animationTarget =
    win.status === "closing"
      ? { opacity: 0, scale: 0.15, y: 400 }
      : win.status === "minimizing"
        ? { opacity: 0, scale: 0.2, y: 400 }
        : { opacity: 1, scale: 1, y: 0 };

  return (
    <AnimatedWindow
      isDragging={isDragging}
      animate={animationTarget}
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
        win.maximized &&
          "is-maximized !border-0 !border-none !rounded-none !shadow-none",
        "z-50 max-[720px]:!inset-0 max-[720px]:h-screen max-[720px]:!w-screen max-[720px]:!rounded-none max-[720px]:!border-none",
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
      <div className="hidden h-10 shrink-0 items-center gap-3.5 border-b border-white/10 bg-[rgba(17,20,32,0.92)] px-1 backdrop-blur-md max-[720px]:flex" />

      <WindowTitleBar
        meta={meta}
        onClose={() => closeWindow(id)}
        onMinimize={() => minimizeWindow(id)}
        onMaximize={() => toggleMaximize(id)}
        onDragStart={onDragStart}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        onAnimationComplete={() => setShowContent(true)}
        id={"window-container-" + id}
        className="wbody-scroll relative w-full flex-1 overflow-auto pb-5 @container sm:pb-0"
      >
        {showContent ? children : null}
      </motion.div>

      <WindowResizeHandle onResizeStart={onResizeStart} />
    </AnimatedWindow>
  );
}

export default Window;
