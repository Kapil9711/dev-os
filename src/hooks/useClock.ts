"use client";

import { useEffect, useState } from "react";
import { formatClock } from "@/lib/utils";

/** Returns the current time formatted as HH:MM, refreshed every 15s. */
export function useClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatClock(new Date()));
    const id = setInterval(() => setTime(formatClock(new Date())), 15_000);
    return () => clearInterval(id);
  }, []);

  return time;
}
