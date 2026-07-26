"use client";

import { useEffect, useState } from "react";
import { BootScreen } from "@/components/common/BootScreen";
import {
  WindowManagerProvider,
  useWindowManager,
} from "@/features/window-manager/context/WindowManagerContext";
import { WindowLayer } from "@/features/window-manager/components/WindowLayer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Wallpaper } from "./components/Wallpaper";
import { MenuBar } from "./components/MenuBar";
import { DesktopIcons } from "./components/DesktopIcons";
import { DesktopWidgets } from "./components/DesktopWidgets";
import { Dock } from "./components/Dock";
import { Notification } from "./components/Notification";
import { Spotlight } from "./components/Spotlight";
import { MobileStatusBar } from "./components/MobileStatusBar";
import { MobileHome } from "./components/MobileHome";
import { MobileNavBar } from "./components/MobileNavBar";

export function Desktop() {
  const [booted, setBooted] = useState(false);

  return (
    <WindowManagerProvider>
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      <DesktopShell booted={booted} />
    </WindowManagerProvider>
  );
}

function DesktopShell({ booted }: { booted: boolean }) {
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 720px)");
  const { openWindow, openOrder } = useWindowManager();

  // Keyboard shortcut for Spotlight, and Escape to close it.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpotlightOpen(true);
      }
      if (e.key === "Escape") setSpotlightOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Open a starter set of windows shortly after boot, matching the original demo.
  useEffect(() => {
    if (!booted) return;
    const t = setTimeout(() => {
      if (!isMobile) {
        openWindow("about");
        // openWindow("terminal");
        // openWindow("monitor");

        // openWindow("portfolio");
      }
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted]);

  return (
    <div className="relative h-full w-full">
      <Wallpaper />
      <MenuBar onOpenSpotlight={() => setSpotlightOpen(true)} />
      <DesktopIcons />
      <DesktopWidgets />
      <Notification />
      <Spotlight open={spotlightOpen} onClose={() => setSpotlightOpen(false)} />
      <WindowLayer />
      <Dock />
      <MobileStatusBar />
      <MobileHome
        visible={isMobile && openOrder.length === 0}
        onOpenSpotlight={() => setSpotlightOpen(true)}
      />
      <MobileNavBar />
      <div id="print-only" className="hidden" />
    </div>
  );
}
