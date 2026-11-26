"use client";

import { useMemo } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

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
    <div className="glass-panel group relative overflow-hidden rounded-[18px] border-cyan-500/25 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition duration-200 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]">
      {/* Top subtle HUD tag */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan-400/80">
          <CalendarIcon size={11} className="text-cyan-400" />
          <span>Calendar // HUD</span>
        </div>
        <span className="font-mono text-[10px] text-cyan-300/60">{calendar.year}</span>
      </div>

      <div className="mb-3 flex items-baseline justify-between border-b border-cyan-500/15 pb-2">
        <div className="font-mono text-[28px] font-extrabold leading-none tracking-tight text-cyan-100">
          {calendar.day}
        </div>
        <div className="text-right text-[12px] font-semibold tracking-wide text-cyan-200/90">
          {calendar.month}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px]">
        {WEEKDAY_LABELS.map((w, i) => (
          <div key={`${w}-${i}`} className="mb-1 text-[9.5px] font-semibold text-cyan-400/50">
            {w}
          </div>
        ))}
        {calendar.cells.map((cell, i) =>
          cell === null ? (
            <div key={i} className="invisible py-1">
              .
            </div>
          ) : (
            <div
              key={i}
              className={
                cell === calendar.day
                  ? "flex items-center justify-center rounded-md border border-cyan-300 bg-gradient-to-br from-[#00f0ff] to-[#00b4d8] py-0.5 font-bold text-black shadow-[0_0_10px_#00f0ff]"
                  : "py-0.5 text-slate-300/80 hover:bg-cyan-500/10 hover:text-cyan-200 rounded"
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
