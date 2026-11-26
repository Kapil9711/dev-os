"use client";

import AuroraBackground from "./AuroraBackground";

export function Wallpaper() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden select-none"
      style={{
        background:
          "radial-gradient(circle at 18% 20%, rgba(0, 240, 255, 0.15), transparent 45%)," +
          "radial-gradient(circle at 82% 16%, rgba(0, 180, 216, 0.12), transparent 48%)," +
          "radial-gradient(circle at 75% 82%, rgba(14, 165, 233, 0.1), transparent 45%)," +
          "radial-gradient(circle at 20% 85%, rgba(0, 240, 255, 0.12), transparent 42%)," +
          "linear-gradient(165deg, #02040b 0%, #040816 45%, #02050c 100%)",
      }}
    >
      {/* 3D WebGL Aurora Simulation */}
      <AuroraBackground />

      {/* Clean Cyberpunk HUD Grid Scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Subtle Horizontal CRT / Hologram Scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0, 240, 255, 0.4) 0px, rgba(0, 240, 255, 0.4) 1px, transparent 1px, transparent 4px)",
        }}
      />

      {/* Clean Glowing Cyan & Ice-Blue Plasma Drifting Orbs */}
      <div
        className="pointer-events-none absolute animate-drift rounded-full opacity-60 blur-[80px]"
        style={{
          width: 520,
          height: 520,
          top: -120,
          left: -90,
          background:
            "radial-gradient(circle, rgba(0, 240, 255, 0.45), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute animate-drift rounded-full opacity-50 blur-[80px] [animation-delay:-8s]"
        style={{
          width: 460,
          height: 460,
          bottom: -130,
          right: -70,
          background:
            "radial-gradient(circle, rgba(0, 180, 216, 0.35), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute animate-drift rounded-full opacity-45 blur-[70px] [animation-delay:-14s]"
        style={{
          width: 380,
          height: 380,
          top: "38%",
          right: "18%",
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.3), transparent 70%)",
        }}
      />

      {/* Subtle fine digital noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Ambient Vignette for Window Focus */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: "inset 0 0 170px rgba(1, 3, 8, 0.9)",
        }}
      />

      {/* Cyber HUD Corner Telemetry Brackets */}
      <div className="pointer-events-none absolute top-14 left-5 h-5 w-5 border-t border-l border-cyan-400/30" />
      <div className="pointer-events-none absolute top-14 right-5 h-5 w-5 border-t border-r border-cyan-400/30" />
      <div className="pointer-events-none absolute bottom-16 left-5 h-5 w-5 border-b border-l border-cyan-400/30" />
      <div className="pointer-events-none absolute bottom-16 right-5 h-5 w-5 border-b border-r border-cyan-400/30" />
    </div>
  );
}
