"use client";

import { useEffect, useState } from "react";

const WEATHER_CODES: Record<number, [icon: string, desc: string]> = {
  0: ["☀️", "Clear sky"],
  1: ["🌤️", "Mostly clear"],
  2: ["⛅", "Partly cloudy"],
  3: ["☁️", "Overcast"],
  45: ["🌫️", "Fog"],
  48: ["🌫️", "Fog"],
  51: ["🌦️", "Light drizzle"],
  53: ["🌦️", "Drizzle"],
  55: ["🌧️", "Dense drizzle"],
  61: ["🌧️", "Light rain"],
  63: ["🌧️", "Rain"],
  65: ["🌧️", "Heavy rain"],
  71: ["🌨️", "Light snow"],
  73: ["🌨️", "Snow"],
  75: ["❄️", "Heavy snow"],
  80: ["🌦️", "Rain showers"],
  81: ["🌧️", "Rain showers"],
  82: ["⛈️", "Violent showers"],
  95: ["⛈️", "Thunderstorm"],
  96: ["⛈️", "Thunderstorm"],
  99: ["⛈️", "Severe storm"],
};

interface WeatherState {
  temp: number | null;
  icon: string;
  desc: string;
  place: string;
}

/** Fetches current weather for the developer's location (Open-Meteo, no API key). */
export function useWeather(lat: number, lon: number, place: string) {
  const [weather, setWeather] = useState<WeatherState>({
    temp: null,
    icon: "⛅",
    desc: "Loading…",
    place,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`,
        );
        const data = await res.json();
        if (cancelled) return;
        const code = data.current.weather_code as number;
        const [icon, desc] = WEATHER_CODES[code] ?? ["🌡️", "—"];
        setWeather({ temp: Math.round(data.current.temperature_2m), icon, desc, place });
      } catch {
        if (!cancelled) {
          setWeather({ temp: null, icon: "🌡️", desc: "Weather unavailable", place: "Check connection" });
        }
      }
    }

    load();
    const id = setInterval(load, 15 * 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [lat, lon, place]);

  return weather;
}
