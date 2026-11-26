"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const BOOT_LINES = [
  "loading cybernetic kernel // v2.6.0",
  "mounting virtual subsystems",
  "connecting → github.com/Kapil9711",
  "initializing telemetry.sys & hud.engine",
  "indexing project artifacts",
];

const LINE_INTERVAL = 260;

/** Plays a short premium boot sequence, then fades out and calls onDone(). */
export function BootScreen({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setProgress(100);
      const t = setTimeout(finish, 250);
      return () => clearTimeout(t);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
          setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
        }, LINE_INTERVAL * i),
      );
    });

    timers.push(
      setTimeout(
        () => setShowWelcome(true),
        LINE_INTERVAL * BOOT_LINES.length + 200,
      ),
    );
    timers.push(setTimeout(() => setShowSkip(true), 900));
    timers.push(setTimeout(finish, LINE_INTERVAL * BOOT_LINES.length + 900));

    function onKeyOrClick() {
      finish();
    }
    window.addEventListener("keydown", onKeyOrClick, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", onKeyOrClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    setFadeOut(true);
    setTimeout(onDone, 480);
  }

  return (
    <div
      onClick={finish}
      className={cn(
        "boot-root fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#02050e] transition-all duration-500 ease-out select-none",
        fadeOut && "pointer-events-none scale-[1.03] opacity-0 blur-[6px]",
      )}
    >
      <div className="boot-grid" />
      <div className="boot-glow" />

      <div className="relative mb-6 flex flex-col items-center">
        <div className="logo-glow font-mono text-base font-bold tracking-wider text-cyan-100">
          kap<span className="text-cyan-400">OS</span>
          <span className="ml-2 rounded border border-cyan-400/30 bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-normal text-cyan-300">
            CYBER_HUD v2.6
          </span>
        </div>
      </div>

      <div className="relative min-h-[170px] w-[min(480px,88vw)] font-mono text-[12.5px] text-slate-300">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => {
          const isLast = i === visibleLines - 1;
          return (
            <div
              key={line}
              className="boot-line mb-2 flex items-center gap-2"
            >
              <span className="text-cyan-400 drop-shadow-[0_0_6px_#00f0ff]">[OK]</span>
              <span>{line}</span>
              {isLast && !showWelcome && <span className="cursor-blink" />}
            </div>
          );
        })}
        {showWelcome && (
          <div className="welcome-in mt-3 font-mono font-bold text-cyan-200">
            Workstation Ready. Welcome, Recruiter.
            <span className="cursor-blink" />
          </div>
        )}
      </div>

      <div className="relative mt-5 flex w-[min(480px,88vw)] flex-col gap-2">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-cyan-950/60 border border-cyan-500/20">
          <div
            className="progress-bar h-full rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 shadow-[0_0_12px_#00f0ff]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between font-mono text-[10.5px] text-cyan-400/70">
          <span>INITIALIZING</span>
          <span>{progress}%</span>
        </div>
      </div>

      <div
        className={cn(
          "absolute bottom-8 font-mono text-[11px] text-cyan-400/50 opacity-0 transition-opacity duration-500",
          showSkip && "opacity-80",
        )}
      >
        [ press any key to skip ]
      </div>

      <style jsx>{`
        .boot-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(0, 240, 255, 0.05) 1px,
              transparent 1px
            );
          background-size: 48px 48px;
          -webkit-mask-image: radial-gradient(
            ellipse 75% 65% at 50% 45%,
            black 20%,
            transparent 80%
          );
          mask-image: radial-gradient(
            ellipse 75% 65% at 50% 45%,
            black 20%,
            transparent 80%
          );
          animation: gridDrift 20s linear infinite;
        }
        @keyframes gridDrift {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 96px 96px;
          }
        }

        .boot-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 42%,
            rgba(0, 240, 255, 0.16),
            transparent 65%
          );
          animation: glowPulse 3.6s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }

        .logo-glow {
          filter: drop-shadow(0 0 16px rgba(0, 240, 255, 0.45));
          animation: logoIn 0.6s ease-out;
        }
        @keyframes logoIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .boot-line {
          animation: lineIn 0.32s ease-out both;
        }
        @keyframes lineIn {
          from {
            opacity: 0;
            transform: translateX(-6px);
            filter: blur(2px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
            filter: blur(0);
          }
        }

        .welcome-in {
          animation: welcomeIn 0.4s ease-out both;
        }
        @keyframes welcomeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cursor-blink {
          display: inline-block;
          width: 7px;
          height: 13px;
          margin-left: 5px;
          background: #00f0ff;
          box-shadow: 0 0 8px #00f0ff;
          vertical-align: -2px;
          animation: blink 0.9s step-start infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }

        .progress-bar {
          transition: width 0.24s ease-out;
        }
      `}</style>
    </div>
  );
}
