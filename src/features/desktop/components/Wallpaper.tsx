"use client";

import AuroraBackground from "./AuroBackground";

export function Wallpaper() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 15% 20%, rgba(108,99,255,0.2), transparent 40%)," +
          "radial-gradient(circle at 85% 15%, rgba(76,141,255,0.18), transparent 45%)," +
          "radial-gradient(circle at 75% 80%, rgba(155,126,255,0.16), transparent 45%)," +
          "radial-gradient(circle at 20% 85%, rgba(76,141,255,0.1), transparent 40%)," +
          "linear-gradient(160deg, #060812 0%, #0a0d1b 50%, #070914 100%)",
      }}
    >
      {/* <AuroraBackground /> */}

      <div
        className="absolute animate-drift rounded-full opacity-55 blur-[60px]"
        style={{
          width: 480,
          height: 480,
          top: -100,
          left: -80,
          background:
            "radial-gradient(circle, rgba(108,99,255,0.5), transparent 70%)",
        }}
      />
      <div
        className="absolute animate-drift rounded-full opacity-55 blur-[60px] [animation-delay:-8s]"
        style={{
          width: 420,
          height: 420,
          bottom: -120,
          right: -60,
          background:
            "radial-gradient(circle, rgba(76,141,255,0.4), transparent 70%)",
        }}
      />
      <div
        className="absolute animate-drift rounded-full opacity-55 blur-[60px] [animation-delay:-14s]"
        style={{
          width: 340,
          height: 340,
          top: "40%",
          right: "20%",
          background:
            "radial-gradient(circle, rgba(155,126,255,0.35), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
