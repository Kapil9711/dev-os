"use client";

import { useWindowManager } from "@/features/window-manager/context/WindowManagerContext";

export function MobileNavBar() {
  const { openOrder, focusedId, closeWindow, closeAll } = useWindowManager();

  function goBack() {
    if (focusedId) closeWindow(focusedId);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] hidden h-14 items-center justify-center gap-16 bg-[rgba(7,9,16,0.75)] backdrop-blur-md max-[720px]:flex">
      <button
        type="button"
        aria-label="Back"
        onClick={goBack}
        disabled={openOrder.length === 0}
        className="flex h-[22px] w-[22px] items-center justify-center opacity-85 active:opacity-50 disabled:opacity-30"
      >
        <span className="h-2.5 w-2.5 rotate-45 border-b-2 border-l-2 border-[var(--text-1)]" />
      </button>
      <button
        type="button"
        aria-label="Home"
        onClick={closeAll}
        className="flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-[var(--text-1)] opacity-85 active:opacity-50"
      />
      <button
        type="button"
        aria-label="Recents"
        onClick={closeAll}
        className="flex h-4 w-4 items-center justify-center rounded-[3px] border-2 border-[var(--text-1)] opacity-85 active:opacity-50"
      />
    </div>
  );
}
