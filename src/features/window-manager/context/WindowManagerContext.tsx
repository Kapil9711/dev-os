"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { AppId } from "@/constants/apps";
import { APP_REGISTRY } from "@/constants/apps";
import type { WindowRect, WindowState } from "../types/window";

type OpenWindowOptions = {
  width?: number;
  height?: number;
  query?: Record<string, string>;
  state?: unknown;
};

interface WindowManagerValue {
  windows: Record<string, WindowState>;
  hasMaximizedWindow: boolean;
  openOrder: AppId[];
  focusedId: AppId | null;
  openWindow: (id: AppId, options?: OpenWindowOptions) => void;
  closeWindow: (id: AppId) => void;
  finalizeCloseWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  finalizeMinimizeWindow: (id: AppId) => void;
  restoreWindow: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  setWindows: any;
  updateRect: (
    id: AppId,
    rect: Partial<WindowRect> | ((prev: WindowRect) => Partial<WindowRect>),
  ) => void;
  closeAll: () => void;
}

const WindowManagerContext = createContext<WindowManagerValue | null>(null);

/** Picks a cascading default position so new windows don't stack exactly. */
function nextRect(
  index: number,
  isMobile: boolean,
  width: number,
  height: number,
): WindowRect {
  if (isMobile)
    return {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight - 0,
    };
  return {
    x: 260 + (index % 5) * 30,
    y: 60 + (index % 5) * 26,
    width,
    height,
  };
}

export function WindowManagerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [windows, setWindows] = useState<Record<string, WindowState>>({});
  const [openOrder, setOpenOrder] = useState<AppId[]>([]);
  const [focusedId, setFocusedId] = useState<AppId | null>(null);
  const zCounter = useRef(10);
  const cascadeCounter = useRef(0);

  const focusWindow = useCallback((id: AppId) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      zCounter.current += 1;
      return { ...prev, [id]: { ...prev[id], zIndex: zCounter.current } };
    });
    setFocusedId(id);
  }, []);

  const openWindow = useCallback(
    (id: AppId, options: OpenWindowOptions = {}) => {
      const existing = windows[id];
      const shouldFocus = !existing || existing.status !== "closing";

      setWindows((prev) => {
        const existing = prev[id];

        if (existing) {
          zCounter.current++;

          switch (existing.status) {
            case "closing":
            case "minimizing":
              return prev;

            case "minimized":
              return {
                ...prev,
                [id]: {
                  ...existing,
                  status: "restoring",
                  zIndex: zCounter.current,
                  query: options.query ?? existing.query,
                  state: options.state ?? existing.state,
                },
              };

            default:
              return {
                ...prev,
                [id]: {
                  ...existing,
                  zIndex: zCounter.current,
                  query: options.query ?? existing.query,
                  state: options.state ?? existing.state,
                },
              };
          }
        }

        const meta = APP_REGISTRY[id];

        const isMobile =
          typeof window !== "undefined" && window.innerWidth <= 720;

        const width = options.width ?? meta.width;
        const height = options.height ?? meta.height;

        const rect = nextRect(cascadeCounter.current, isMobile, width, height);

        cascadeCounter.current++;
        zCounter.current++;

        return {
          ...prev,
          [id]: {
            id,
            rect,
            status: "open",
            maximized: false,
            prevRect: null,
            zIndex: zCounter.current,
            query: options.query,
            state: options.state,
          },
        };
      });

      setOpenOrder((prev) => (prev.includes(id) ? prev : [...prev, id]));

      if (shouldFocus) {
        // Wait until React has committed the state update
        requestAnimationFrame(() => {
          focusWindow(id);
        });
      }
    },
    [windows, focusWindow],
  );

  const closeWindow = useCallback((id: AppId) => {
    setWindows((prev) =>
      prev[id]
        ? {
            ...prev,
            [id]: {
              ...prev[id],
              status: "closing",
            },
          }
        : prev,
    );
  }, []);

  const finalizeCloseWindow = useCallback((id: AppId) => {
    setWindows((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

    setOpenOrder((prev) => prev.filter((appId) => appId !== id));
    setFocusedId((prev) => (prev === id ? null : prev));
  }, []);

  const minimizeWindow = useCallback((id: AppId) => {
    setWindows((prev) =>
      prev[id]
        ? {
            ...prev,
            [id]: {
              ...prev[id],
              status: "minimizing",
            },
          }
        : prev,
    );
  }, []);

  const finalizeMinimizeWindow = useCallback((id: AppId) => {
    console.log("FINALIZE MINIMIZE", id);

    setWindows((prev) =>
      prev[id]
        ? {
            ...prev,
            [id]: {
              ...prev[id],
              status: "minimized",
            },
          }
        : prev,
    );
  }, []);

  const restoreWindow = useCallback(
    (id: AppId) => {
      setWindows((prev) =>
        prev[id]
          ? {
              ...prev,
              [id]: {
                ...prev[id],
                status: "open",
              },
            }
          : prev,
      );

      focusWindow(id);
    },
    [focusWindow],
  );

  const bringToFront = useCallback((id: AppId) => {
    zCounter.current++;

    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;

      return {
        ...prev,
        [id]: {
          ...win,
          zIndex: zCounter.current,
        },
      };
    });

    setFocusedId(id);
  }, []);

  const toggleMaximize = useCallback((id: AppId) => {
    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;
      console.log(
        typeof window !== "undefined" ? window.innerWidth : win.rect.width,

        typeof window !== "undefined" ? window.innerHeight : win.rect.height,
      );
      if (!win.maximized) {
        return {
          ...prev,
          [id]: {
            ...win,
            maximized: true,
            prevRect: win.rect,
            rect: {
              x: 0,
              y: 0,
              width:
                typeof window !== "undefined"
                  ? window.innerWidth
                  : win.rect.width,
              height:
                typeof window !== "undefined"
                  ? window.innerHeight
                  : win.rect.height,
            },
          },
        };
      }
      return {
        ...prev,
        [id]: {
          ...win,
          maximized: false,
          rect: win.prevRect ?? win.rect,
          prevRect: null,
        },
      };
    });
  }, []);

  const updateRect = useCallback(
    (
      id: AppId,
      rect: Partial<WindowRect> | ((prev: WindowRect) => Partial<WindowRect>),
    ) => {
      setWindows((prev) => {
        const window = prev[id];
        if (!window) return prev;

        const nextRect = typeof rect === "function" ? rect(window.rect) : rect;

        return {
          ...prev,
          [id]: {
            ...window,
            rect: {
              ...window.rect,
              ...nextRect,
            },
          },
        };
      });
    },
    [],
  );
  const closeAll = useCallback(() => {
    setWindows({});
    setOpenOrder([]);
    setFocusedId(null);
  }, []);

  const hasMaximizedWindow = Object.values(windows).some(
    (window) =>
      window.status !== "closing" &&
      window.status !== "minimized" &&
      window.maximized,
  );

  const value = useMemo<WindowManagerValue>(
    () => ({
      windows,
      openOrder,
      focusedId,
      openWindow,
      closeWindow,
      finalizeCloseWindow,
      minimizeWindow,
      finalizeMinimizeWindow,
      restoreWindow,
      toggleMaximize,
      focusWindow,
      updateRect,
      setWindows,
      closeAll,
      hasMaximizedWindow,
    }),
    [
      windows,
      openOrder,
      focusedId,
      openWindow,
      closeWindow,
      finalizeCloseWindow,
      minimizeWindow,
      finalizeMinimizeWindow,
      restoreWindow,
      toggleMaximize,
      focusWindow,
      updateRect,
      setWindows,
      closeAll,
      hasMaximizedWindow,
    ],
  );

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) {
    throw new Error(
      "useWindowManager must be used within WindowManagerProvider",
    );
  }
  return ctx;
}
