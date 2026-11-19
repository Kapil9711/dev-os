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
      <div className="pointer-events-none absolute -top-8 z-30 rounded-md border border-white/10 bg-[rgba(10,13,26,0.9)] px-2 py-0.5 text-[11px] font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-150 group-hover:opacity-100">
        {meta.title.split(" — ")[0]}
      </div>

      <motion.button
        ref={ref}
        type="button"
        aria-label={meta.title}
        onClick={onClick}
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-[18px] border border-white/10 bg-gradient-to-br from-white/15 to-white/5 shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-colors hover:border-white/20 active:scale-95"
      >
        <div className="text-white">
          <Icon />
        </div>
      </motion.button>

      <span
        className={`mt-1.5 h-1 w-1 rounded-full transition-all duration-200 ${
          running ? "bg-white/80 opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
