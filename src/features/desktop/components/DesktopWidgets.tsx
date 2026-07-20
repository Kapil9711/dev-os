"use client";

import { useMemo } from "react";
import { DEV } from "@/constants/dev";
import { PROJECTS } from "@/features/projects/data/projects";
import { useWeather } from "../hooks/useWeather";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

const HOME_COORDS = { lat: 30.901, lon: 75.8573, place: "Ludhiana, IN" };

export function DesktopWidgets() {
  const weather = useWeather(
    HOME_COORDS.lat,
    HOME_COORDS.lon,
    HOME_COORDS.place,
  );
  const calendar = useMemo(() => buildCalendar(), []);

  return (
    <div className="fixed left-[22px] top-14 z-[5] flex w-[220px] flex-col gap-3.5 max-[720px]:hidden">
      <div className="glass-panel rounded-[18px] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
        <div className="mb-2.5 text-[10.5px] uppercase tracking-wider text-[var(--text-2)]">
          Weather
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[32px]">{weather.icon}</div>
          <div>
            <div className="text-[26px] font-extrabold leading-none">
              {weather.temp !== null ? `${weather.temp}°C` : "—°"}
            </div>
            <div className="mt-[3px] text-[11.5px] text-[var(--text-2)]">
              {weather.desc}
            </div>
            <div className="mt-0.5 text-[10.5px] text-[var(--text-2)]">
              {weather.place}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-[18px] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
        <div className="mb-2.5 text-[10.5px] uppercase tracking-wider text-[var(--text-2)]">
          Calendar
        </div>
        <div className="mb-2.5 flex items-baseline justify-between">
          <div className="text-[26px] font-extrabold leading-none">
            {calendar.day}
          </div>
          <div className="text-right text-xs leading-tight text-[var(--text-2)]">
            {calendar.month}
            <br />
            {calendar.year}
          </div>
        </div>
        <div className="grid grid-cols-7 gap-[3px] text-center text-[9.5px] text-[var(--text-2)]">
          {WEEKDAY_LABELS.map((w, i) => (
            <div key={`${w}-${i}`} className="mb-[3px] opacity-50">
              {w}
            </div>
          ))}
          {calendar.cells.map((cell, i) =>
            cell === null ? (
              <div key={i} className="invisible py-[3px]">
                .
              </div>
            ) : (
              <div
                key={i}
                className={
                  cell === calendar.day
                    ? "rounded bg-gradient-to-br from-accent to-accent-2 py-[3px] font-bold text-white"
                    : "rounded py-[3px]"
                }
              >
                {cell}
              </div>
            ),
          )}
        </div>
      </div>

      <div className="glass-panel rounded-[18px] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
        <div className="mb-2.5 text-[10.5px] uppercase tracking-wider text-[var(--text-2)]">
          Quick Stats
        </div>
        <StatRow
          k="Status"
          v={
            <span className="flex items-center gap-1.5 text-success">
              <span className="pulse-dot" />
              Open to work
            </span>
          }
        />
        <StatRow k="Experience" v={DEV.experience} />
        <StatRow k="Projects" v={String(PROJECTS.length)} />
      </div>
    </div>
  );
}

function StatRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-[5px] text-xs">
      <span className="text-[var(--text-2)]">{k}</span>
      <span className="font-bold">{v}</span>
    </div>
  );
}

function buildCalendar() {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  return {
    day: now.getDate(),
    month: MONTH_NAMES[now.getMonth()],
    year: now.getFullYear(),
    cells,
  };
}
