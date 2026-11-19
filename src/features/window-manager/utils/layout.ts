import type { WindowRect } from "../types/window";

/**
 * Calculates a cascading default position for newly opened windows
 * so they don't stack directly on top of each other.
 */
export function nextRect(
  index: number,
  isMobile: boolean,
  width: number,
  height: number,
): WindowRect {
  if (isMobile) {
    return {
      x: 0,
      y: 0,
      width: typeof window !== "undefined" ? window.innerWidth : width,
      height: typeof window !== "undefined" ? window.innerHeight : height,
    };
  }

  return {
    x: 260 + (index % 5) * 30,
    y: 60 + (index % 5) * 26,
    width,
    height,
  };
}
