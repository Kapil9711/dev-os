"use client";

import React from "react";
import { motion, useMotionValue } from "framer-motion";
import { DOCK_APPS } from "@/constants/apps";
import { useWindowManager } from "@/features/window-manager/context/WindowManagerContext";
import { DockItem } from "./DockItem";

export function Dock() {
  const { windows, openWindow, hasMaximizedWindow } = useWindowManager();
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      className="fixed inset-x-0 bottom-3.5 z-50 flex justify-center max-[720px]:hidden"
      animate={{
        y: hasMaximizedWindow ? 100 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 28,
      }}
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass-panel flex items-end gap-1.5 rounded-[22px] px-3.5 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {DOCK_APPS.map((id, index) => {
          const isLast = index === DOCK_APPS.length - 1;

          return (
            <React.Fragment key={id}>
              {isLast && (
                <div className="mx-1 w-px self-stretch bg-[var(--line)]" />
              )}
              <DockItem
                id={id}
                mouseX={mouseX}
                running={
                  !!windows[id] &&
                  windows[id].status !== "minimized" &&
                  windows[id].status !== "closing"
                }
                onClick={() => openWindow(id)}
              />
            </React.Fragment>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default Dock;
