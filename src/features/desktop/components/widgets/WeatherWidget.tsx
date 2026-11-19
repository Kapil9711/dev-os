"use client";

import { useWeather } from "../../hooks/useWeather";

const HOME_COORDS = { lat: 30.901, lon: 75.8573, place: "Ludhiana, IN" };

export function WeatherWidget() {
  const weather = useWeather(
    HOME_COORDS.lat,
    HOME_COORDS.lon,
    HOME_COORDS.place,
  );

  return (
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
  );
}
