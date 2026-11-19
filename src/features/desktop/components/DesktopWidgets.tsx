"use client";

import { WeatherWidget } from "./widgets/WeatherWidget";
import { CalendarWidget } from "./widgets/CalendarWidget";
import { QuickStatsWidget } from "./widgets/QuickStatsWidget";

export function DesktopWidgets() {
  return (
    <div className="fixed left-[22px] top-14 z-[5] flex w-[220px] flex-col gap-3.5 max-[720px]:hidden">
      <WeatherWidget />
      <CalendarWidget />
      <QuickStatsWidget />
    </div>
  );
}

export default DesktopWidgets;
