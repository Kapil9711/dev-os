"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { APP_REGISTRY, type AppId } from "@/constants/apps";

const BASE_SIZE = 48;
const MAGNIFIED_SIZE = 72;
const DISTANCE = 180;

export interface DockItemProps {
  id: AppId;
  running: boolean;
  onClick: () => void;
  mouseX: ReturnType<typeof useMotionValue<number>>;
}

export function DockItem({ id, running, onClick, mouseX }: DockItemProps) {
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
    stiffness: 400,
    damping: 25,
  });

  if (!meta) return null;
  const Icon = meta.icon;

  return (
    <div className="group relative flex flex-col items-center">
      {/* Tooltip */}
      <div className="pointer-events-none absolute -top-10 z-30 whitespace-nowrap rounded-lg border border-cyan-400/30 bg-[#030611]/95 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-cyan-100 opacity-0 shadow-[0_0_15px_rgba(0,240,255,0.25)] backdrop-blur-md transition-opacity duration-150 group-hover:opacity-100">
        {meta.title.split(" — ")[0]}
      </div>

      <motion.button
        ref={ref}
        type="button"
        aria-label={meta.title}
        onClick={onClick}
        style={{ width: size, height: size }}
        className="dock-item-btn flex items-center justify-center active:scale-95"
      >
        <div className="dock-icon text-cyan-200 transition-colors duration-150 group-hover:text-cyan-50">
          <Icon />
        </div>
      </motion.button>

      {/* Running indicator dot */}
      <span
        className={`mt-1.5 h-1.5 w-1.5 rounded-full transition-all duration-200 ${
          running
            ? "bg-cyan-400 opacity-100 shadow-[0_0_8px_#00f0ff]"
            : "opacity-0"
        }`}
      />
    </div>
  );
}
