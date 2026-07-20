import type { AppId } from "@/constants/apps";

export interface WindowRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type WindowStatus =
  "opening" | "open" | "minimizing" | "minimized" | "restoring" | "closing";

export interface WindowState {
  id: AppId;
  rect: WindowRect;
  zIndex: number;

  status: WindowStatus;

  maximized: boolean;
  prevRect: WindowRect | null;
}
