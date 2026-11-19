"use client";

import { useEffect, useMemo, useState } from "react";
import { buildHeatmap } from "../utils/heatmap";
import { SystemOverview } from "./SystemOverview";
import { TechRadar } from "./TechRadar";
import { RecentActivity } from "./RecentActivity";
import { ContributionGraph } from "./ContributionGraph";

export function Monitor() {
  const [mounted, setMounted] = useState(false);
  const heatmap = useMemo(() => buildHeatmap(), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-4 p-5 pb-10 sm:pb-0">
      <SystemOverview mounted={mounted} />
      <TechRadar mounted={mounted} />
      <RecentActivity />
      <ContributionGraph cells={heatmap} />
    </div>
  );
}

export default Monitor;
