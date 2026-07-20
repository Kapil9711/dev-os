"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const BOOT_LINES = [
  "loading kernel",
  "mounting components",
  "connecting → github.com/Kapil9711",
  "initializing portfolio.sys",
  "indexing repositories",
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
        "boot-root fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#05060b] transition-all duration-500 ease-out",
        fadeOut && "pointer-events-none scale-[1.03] opacity-0 blur-[6px]",
      )}
    >
      <div className="boot-grid" />
      <div className="boot-glow" />

      <div className="relative mb-6 flex flex-col items-center">
        <div className="logo-glow text-[15px] font-bold tracking-[0.02em] text-[var(--text-1)]">
          kap<span className="text-accent-3">OS</span>
          <span className="ml-2 text-[11px] font-normal text-[var(--text-2)]">
            v2.6.0
          </span>
        </div>
      </div>

      <div className="relative min-h-[170px] w-[min(460px,86vw)] font-mono text-[12.5px] text-[var(--text-2)]">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => {
          const isLast = i === visibleLines - 1;
          return (
            <div
              key={line}
              className="boot-line mb-1.5 flex items-center gap-1.5"
            >
              <span className="text-success">[ok]</span>
              <span>{line}</span>
              {isLast && !showWelcome && <span className="cursor-blink" />}
            </div>
          );
        })}
        {showWelcome && (
          <div className="welcome-in mt-2.5 font-semibold text-[var(--text-1)]">
            Welcome, Recruiter.
            <span className="cursor-blink" />
          </div>
        )}
      </div>

      <div className="relative mt-5 flex w-[min(460px,86vw)] flex-col gap-1.5">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="progress-bar h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-[var(--text-2)]/60 flex justify-between font-mono text-[10px]">
          <span>booting</span>
          <span>{progress}%</span>
        </div>
      </div>

      <div
        className={cn(
          "absolute bottom-[26px] text-[11px] text-[var(--text-2)] opacity-0 transition-opacity duration-500",
          showSkip && "opacity-70",
        )}
      >
        press any key to skip
      </div>

      <style jsx>{`
        .boot-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.035) 1px,
              transparent 1px
            );
          background-size: 42px 42px;
          -webkit-mask-image: radial-gradient(
            ellipse 70% 60% at 50% 45%,
            black 20%,
            transparent 75%
          );
          mask-image: radial-gradient(
            ellipse 70% 60% at 50% 45%,
            black 20%,
            transparent 75%
          );
          animation: gridDrift 18s linear infinite;
        }
        @keyframes gridDrift {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 84px 84px;
          }
        }

        .boot-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 40%,
            rgba(108, 99, 255, 0.16),
            transparent 60%
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
          filter: drop-shadow(0 0 14px rgba(108, 99, 255, 0.35));
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
          width: 6px;
          height: 12px;
          margin-left: 4px;
          background: currentColor;
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
          box-shadow: 0 0 12px 1px
            color-mix(in srgb, var(--accent) 60%, transparent);
        }
      `}</style>
    </div>
  );
}
