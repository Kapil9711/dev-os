"use client";

import { useMemo } from "react";

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

export function CalendarWidget() {
  const calendar = useMemo(() => buildCalendar(), []);

  return (
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
  );
}
