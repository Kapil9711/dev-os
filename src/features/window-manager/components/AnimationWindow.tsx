"use client";

import { motion, type TargetAndTransition } from "framer-motion";

interface AnimatedWindowProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onPointerDown?: () => void;

  animate?: TargetAndTransition;

  onAnimationComplete?: () => void;

  isDragging?: boolean;
}

export function AnimatedWindow({
  children,
  style,
  className,
  onPointerDown,
  animate,
  onAnimationComplete,
  isDragging = false,
}: AnimatedWindowProps) {
  return (
    <motion.div
      layout={!isDragging}
      initial={{
        opacity: 0,
        scale: 0.85,
        y: 80,
      }}
      animate={
        animate ?? {
          opacity: 1,
          scale: 1,
          y: 0,
        }
      }
      transition={{
        layout: {
          type: "spring",
          stiffness: 420,
          damping: 32,
        },
        type: "spring",
        stiffness: 320,
        damping: 30,
      }}
      className={className}
      style={style}
      onPointerDown={onPointerDown}
      onAnimationComplete={onAnimationComplete}
    >
      {children}
    </motion.div>
  );
}
