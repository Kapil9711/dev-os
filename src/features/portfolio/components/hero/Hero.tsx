"use client";

import { useState } from "react";
import Image from "next/image";

import { PROFILE } from "../../data";

import Badge from "../common/Badge";
import Button from "../common/Button";
import Container from "../common/Container";
import GlassCard from "../common/GlassCard";
import Heading from "../common/Heading";
import Paragraph from "../common/Paragraph";
import Section from "../common/Section";
import HeroScene from "../three/HeroScene";
import { useMobile } from "@/hooks/useMobile";

export default function Hero() {
  const isMobile = useMobile();
  return (
    <Section
      id="hero"
      className="relative flex flex-col overflow-hidden pb-10 pt-10 @5xl:pt-0 @7xl:min-h-[100svh] @7xl:min-h-screen @7xl:justify-center @7xl:pb-0 @7xl:pt-0"
    >
      {/* Three.js background — desktop/tablet only. Skipped below @5xl: costs
          GPU/battery for no real payoff at that size, and reads as noise
          rather than depth on a small dark canvas. */}

      {!isMobile && (
        <div className="pointer-events-none absolute inset-0 -z-10 block opacity-80">
          <HeroScene />
        </div>
      )}
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 -z-10 h-[320px] w-[320px] rounded-full opacity-25 blur-[100px] @5xl:h-[420px] @5xl:w-[420px] @5xl:blur-[130px] @7xl:h-[520px] @7xl:w-[520px] @7xl:blur-[140px]"
        style={{
          background: "radial-gradient(circle, var(--accent), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[280px] w-[280px] rounded-full opacity-20 blur-[100px] @5xl:h-[380px] @5xl:w-[380px] @5xl:blur-[130px] @7xl:h-[480px] @7xl:w-[480px] @7xl:blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, var(--accent-2), transparent 70%)",
        }}
      />

      <Container>
        <div className="@9xl:grid-cols-[1fr_500px] grid items-center gap-12 @3xl:grid-cols-[1fr_420px] @7xl:gap-16">
          {/* ---------------- Left ---------------- */}

          <div>
            <Badge className="mb-5 inline-flex items-center gap-2 @5xl:mb-6">
              <span className="relative flex h-2 w-2 shrink-0">
                {PROFILE.availableForWork && (
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                    style={{ background: "var(--success)" }}
                  />
                )}
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{
                    background: PROFILE.availableForWork
                      ? "var(--success)"
                      : "var(--text-2)",
                  }}
                />
              </span>
              <span className="whitespace-nowrap">
                {PROFILE.availableForWork
                  ? "Available for Work"
                  : "Unavailable"}
              </span>
            </Badge>

            <Heading className="max-w-3xl break-words">
              Hi, I'm{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--accent), var(--accent-3))",
                }}
              >
                {PROFILE.name}
              </span>
            </Heading>

            <h2
              className="mt-4 text-xl font-light @5xl:mt-5 @5xl:text-2xl @7xl:text-3xl"
              style={{ color: "var(--text-2)" }}
            >
              {PROFILE.title}
            </h2>

            <Paragraph className="mt-6 max-w-2xl @5xl:mt-8">
              {PROFILE.description}
            </Paragraph>

            {/* Buttons */}

            <div className="mt-8 flex flex-wrap gap-3 @5xl:mt-10 @5xl:gap-4">
              <Button href="#projects" variant="primary">
                View Projects
              </Button>
              <Button href="#contact" variant="secondary">
                Contact Me
              </Button>
            </div>

            {/* Stats */}

            <div className="mt-10 grid grid-cols-3 gap-2.5 @5xl:mt-14 @5xl:gap-4">
              <GlassCard className="p-3 text-center transition-transform duration-300 hover:-translate-y-1 @5xl:p-6">
                <h3
                  className="text-xl font-bold @5xl:text-2xl @7xl:text-4xl"
                  style={{ color: "var(--text-1)" }}
                >
                  {PROFILE.experience}+
                </h3>
                <p
                  className="mt-1 text-[11px] @5xl:mt-2 @5xl:text-sm"
                  style={{ color: "var(--text-2)" }}
                >
                  Years
                </p>
              </GlassCard>

              <GlassCard className="p-3 text-center transition-transform duration-300 hover:-translate-y-1 @5xl:p-6">
                <h3
                  className="text-xl font-bold @5xl:text-2xl @7xl:text-4xl"
                  style={{ color: "var(--text-1)" }}
                >
                  20+
                </h3>
                <p
                  className="mt-1 text-[11px] @5xl:mt-2 @5xl:text-sm"
                  style={{ color: "var(--text-2)" }}
                >
                  Projects
                </p>
              </GlassCard>

              <GlassCard className="p-3 text-center transition-transform duration-300 hover:-translate-y-1 @5xl:p-6">
                <h3
                  className="text-xl font-bold @5xl:text-2xl @7xl:text-4xl"
                  style={{ color: "var(--text-1)" }}
                >
                  100%
                </h3>
                <p
                  className="mt-1 text-[11px] @5xl:mt-2 @5xl:text-sm"
                  style={{ color: "var(--text-2)" }}
                >
                  Passion
                </p>
              </GlassCard>
            </div>
          </div>

          {/* ---------------- Right ---------------- */}

          <div className="mx-auto w-full max-w-[360px] @5xl:max-w-[420px] @7xl:max-w-none">
            <TiltCard />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function TiltCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [tiltEnabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!tiltEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  }

  return (
    <div
      className="relative [perspective:1200px]"
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <GlassCard
        className="overflow-hidden p-4 transition-transform duration-300 ease-out @5xl:p-5"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl @5xl:rounded-3xl">
          <Image
            src={PROFILE.avatar}
            alt={PROFILE.name}
            fill
            priority
            sizes="(min-width: 1280px) 500px, (min-width: 1024px) 420px, (min-width: 640px) 420px, 100vw"
            className="object-cover"
          />
        </div>
      </GlassCard>

      <div
        className="pointer-events-none absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-full opacity-25 blur-[90px] @5xl:-left-10 @5xl:-top-10 @5xl:h-56 @5xl:w-56 @5xl:blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--accent), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-full opacity-25 blur-[90px] @5xl:-bottom-10 @5xl:-right-10 @5xl:h-56 @5xl:w-56 @5xl:blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--accent-3), transparent 70%)",
        }}
      />
    </div>
  );
}
