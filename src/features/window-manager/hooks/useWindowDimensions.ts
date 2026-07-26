import { useEffect, useState } from "react";

export const useWindowDimensions = (
  id: string,
): {
  height: number;
  width: number;
} => {
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const container = document.getElementById(`window-container-${id}`);
    if (!container) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const THROTTLE_MS = 100;

    const updateDimensions = () => {
      const { width, height } = container.getBoundingClientRect();

      setDimensions((prev) => {
        if (prev.width === width && prev.height === height) {
          return prev;
        }

        return { width, height };
      });
    };

    const throttledUpdate = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        timeoutId = null;
        updateDimensions();
      }, THROTTLE_MS);
    };

    // Initial measurement
    updateDimensions();

    const observer = new ResizeObserver(throttledUpdate);
    observer.observe(container);

    return () => {
      observer.disconnect();

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [id]);

  return dimensions;
};
