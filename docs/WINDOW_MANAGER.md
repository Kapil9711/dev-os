# Window Manager Subsystem Deep Dive

This document details the architecture, state machine, dragging/resizing mechanics, and responsive handling of the **kapOS Window Manager**.

---

## 1. Window State Machine

Every window in the operating system exists in one of five discrete states:

```
                  ┌───────────────┐
                  │    UNOPENED   │
                  └───────┬───────┘
                          │ openWindow(id)
                          ▼
                  ┌───────────────┐
   ┌─────────────>│     open      │<────────────┐
   │              └───────┬───────┘             │
   │                      │                     │
   │ restoreWindow(id)    │ minimizeWindow(id)  │ restoreWindow(id)
   │                      ▼                     │
   │              ┌───────────────┐             │
   │              │  minimizing   │             │
   │              └───────┬───────┘             │
   │                      │ finalizeMinimize    │
   │                      ▼                     │
   │              ┌───────────────┐             │
   └──────────────┤   minimized   ├─────────────┘
                  └───────────────┘
                          │ closeWindow(id)
                          ▼
                  ┌───────────────┐
                  │    closing    │
                  └───────┬───────┘
                          │ finalizeCloseWindow(id)
                          ▼
                  ┌───────────────┐
                  │    DELETED    │
                  └───────────────┘
```

### State Definitions
- **`open`**: Window is rendered on the canvas, responsive to pointer drag and resize events.
- **`minimizing`**: Transition state triggering a Framer Motion scale-down animation toward the dock.
- **`minimized`**: Window is hidden from the canvas, but its state (scroll position, inputs) is preserved in context. The running indicator dot remains illuminated in the dock.
- **`restoring`**: Transition state animating back from the dock into its previous position.
- **`closing`**: Transition state triggering scale and opacity fade-out.
- **`DELETED`**: The window entry is purged from the `windows` table and removed from `openOrder`.

---

## 2. Core Components & Responsibilities

### `WindowManagerContext.tsx`
- **Window Table**: `Record<string, WindowState>` mapping `AppId` to state:
  ```ts
  interface WindowState {
    id: AppId;
    rect: WindowRect;       // { x, y, width, height }
    prevRect: WindowRect | null; // Cached rect prior to maximizing
    status: "open" | "minimized" | "minimizing" | "restoring" | "closing";
    maximized: boolean;
    zIndex: number;
    query?: Record<string, string>;
    state?: unknown;
  }
  ```
- **Z-Index Counter**: Monotonically increments on every click/focus event, ensuring the clicked window always floats to the top of the stack.
- **Cascading Layout**: Automatically offsets newly opened windows via `nextRect()` to avoid exact overlapping.

### `Window.tsx`
- Coordinates animations (`AnimatedWindow`), titlebar interaction (`WindowTitleBar`), content rendering, and resize handles (`WindowResizeHandle`).
- Enforces minimum dimensions: width >= 320px, height >= 220px.
- Listens to window viewport resize events to update maximized window boundaries automatically.

### `TrafficDots.tsx`
- macOS-style window controls:
  - **Red dot**: Close (`closeWindow`)
  - **Yellow dot**: Minimize (`minimizeWindow`)
  - **Green dot**: Maximize / Restore (`toggleMaximize`)

---

## 3. Responsive Adaptations (Mobile vs. Desktop)

On viewports `<= 720px`:
- Desktop titlebar and traffic dots are replaced by an Android/iOS style full-screen modal viewport (`inset-0 w-screen h-screen`).
- Dock is hidden and replaced by `MobileNavBar` and `MobileHome`.
- Windows take full viewport dimensions (`width: window.innerWidth`, `height: window.innerHeight`).
- Dragging and resizing are disabled.
