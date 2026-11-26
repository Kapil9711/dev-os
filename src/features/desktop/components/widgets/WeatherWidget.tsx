"use client";

import { useWeather } from "../../hooks/useWeather";
import { Cloud, MapPin } from "lucide-react";

const HOME_COORDS = { lat: 30.901, lon: 75.8573, place: "Ludhiana, IN" };

export function WeatherWidget() {
  const weather = useWeather(
    HOME_COORDS.lat,
    HOME_COORDS.lon,
    HOME_COORDS.place,
  );

  return (
    <div className="glass-panel group relative overflow-hidden rounded-[18px] border-cyan-500/25 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition duration-200 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]">
      {/* Top subtle HUD tag */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan-400/80">
          <Cloud size={11} className="text-cyan-400" />
          <span>Weather // HUD</span>
        </div>
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]" />
      </div>

      <div className="flex items-center gap-3.5">
        <div className="text-[34px] drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">
          {weather.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[28px] font-extrabold leading-none tracking-tight text-cyan-100">
            {weather.temp !== null ? `${weather.temp}°C` : "—°"}
          </div>
          <div className="mt-1 truncate text-[12px] font-medium text-cyan-200/80">
            {weather.desc}
          </div>
          <div className="mt-0.5 flex items-center gap-1 text-[11px] text-[var(--text-2)]">
            <MapPin size={10} className="shrink-0 text-cyan-400/70" />
            <span className="truncate">{weather.place}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
