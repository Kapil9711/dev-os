"use client";

import { WeatherWidget } from "./widgets/WeatherWidget";
import { CalendarWidget } from "./widgets/CalendarWidget";
import { QuickStatsWidget } from "./widgets/QuickStatsWidget";

export function DesktopWidgets() {
  return (
    <div className="fixed left-6 top-16 z-[5] flex w-[230px] flex-col gap-3.5 max-[720px]:hidden select-none">
      <WeatherWidget />
      <CalendarWidget />
      <QuickStatsWidget />
    </div>
  );
}

export default DesktopWidgets;
