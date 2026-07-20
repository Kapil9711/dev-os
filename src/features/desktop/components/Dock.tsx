"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import { APP_REGISTRY, DOCK_APPS, type AppId } from "@/constants/apps";
import { useWindowManager } from "@/features/window-manager/context/WindowManagerContext";

const BASE_SIZE = 48;
const MAGNIFIED_SIZE = 72;
const DISTANCE = 180;

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
        {DOCK_APPS.map((id) => (
          <DockItem
            key={id}
            id={id}
            mouseX={mouseX}
            running={
              !!windows[id] &&
              windows[id].status !== "minimized" &&
              windows[id].status !== "closing"
            }
            onClick={() => openWindow(id)}
          />
        ))}

        <div className="mx-1 w-px self-stretch bg-[var(--line)]" />

        <DockItem
          id="settings"
          mouseX={mouseX}
          running={
            !!windows.settings &&
            windows.settings.status !== "minimized" &&
            windows.settings.status !== "closing"
          }
          onClick={() => openWindow("settings")}
        />
      </motion.div>
    </motion.div>
  );
}

interface DockItemProps {
  id: AppId;
  running: boolean;
  onClick: () => void;
  mouseX: ReturnType<typeof useMotionValue<number>>;
}

function DockItem({ id, running, onClick, mouseX }: DockItemProps) {
  const meta = APP_REGISTRY[id];

  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (value) => {
    const rect = ref.current?.getBoundingClientRect();

    if (!rect) return Infinity;

    return value - rect.left - rect.width / 2;
  });

  const targetSize = useTransform(
    distance,
    [-DISTANCE, 0, DISTANCE],
    [BASE_SIZE, MAGNIFIED_SIZE, BASE_SIZE],
  );

  const size = useSpring(targetSize, {
    mass: 0.15,
    stiffness: 220,
    damping: 18,
  });

  const lift = useTransform(distance, [-DISTANCE, 0, DISTANCE], [0, -10, 0]);

  const y = useSpring(lift, {
    mass: 0.15,
    stiffness: 220,
    damping: 18,
  });

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={meta.title}
      style={{
        width: size,
        height: size,
        y,
      }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "group relative flex origin-bottom items-center justify-center rounded-[13px]",
        "border border-white/10",
        "bg-gradient-to-br from-accent/[0.22] to-accent-2/[0.12]",
        "text-xl",
        "transition-shadow duration-200",
        "shadow-lg hover:shadow-xl",
      )}
    >
      <span className="pointer-events-none select-none">{<meta.icon />}</span>

      <span className="pointer-events-none absolute bottom-[70px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[rgba(10,12,20,0.95)] px-2.5 py-1 text-[11px] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {meta.title.split(" — ")[0]}
      </span>

      {running && (
        <motion.span
          layout
          className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent-3"
          style={{
            boxShadow: "0 0 6px #9b7eff",
          }}
        />
      )}
    </motion.button>
  );
}
