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

export default function Hero() {
  return (
    <Section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-16 sm:pt-16 lg:min-h-screen lg:pb-0 lg:pt-0"
    >
      {/* Three.js background — desktop/tablet only. Skipped below sm: costs
          GPU/battery for no real payoff at that size, and reads as noise
          rather than depth on a small dark canvas. */}
      <div className="pointer-events-none absolute inset-0 -z-10 block opacity-80">
        <HeroScene />
      </div>

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 -z-10 h-[320px] w-[320px] rounded-full opacity-25 blur-[100px] sm:h-[420px] sm:w-[420px] sm:blur-[130px] lg:h-[520px] lg:w-[520px] lg:blur-[140px]"
        style={{
          background: "radial-gradient(circle, var(--accent), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[280px] w-[280px] rounded-full opacity-20 blur-[100px] sm:h-[380px] sm:w-[380px] sm:blur-[130px] lg:h-[480px] lg:w-[480px] lg:blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, var(--accent-2), transparent 70%)",
        }}
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_420px] lg:gap-16 xl:grid-cols-[1fr_500px]">
          {/* ---------------- Left ---------------- */}

          <div>
            <Badge className="mb-5 inline-flex items-center gap-2 sm:mb-6">
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
              className="mt-4 text-xl font-light sm:mt-5 sm:text-2xl lg:text-3xl"
              style={{ color: "var(--text-2)" }}
            >
              {PROFILE.title}
            </h2>

            <Paragraph className="mt-6 max-w-2xl sm:mt-8">
              {PROFILE.description}
            </Paragraph>

            {/* Buttons */}

            <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
              <Button href="#projects" variant="primary">
                View Projects
              </Button>
              <Button href="#contact" variant="secondary">
                Contact Me
              </Button>
            </div>

            {/* Stats */}

            <div className="mt-10 grid grid-cols-3 gap-2.5 sm:mt-14 sm:gap-4">
              <GlassCard className="p-3 text-center transition-transform duration-300 hover:-translate-y-1 sm:p-6">
                <h3
                  className="text-xl font-bold sm:text-2xl lg:text-4xl"
                  style={{ color: "var(--text-1)" }}
                >
                  {PROFILE.experience}+
                </h3>
                <p
                  className="mt-1 text-[11px] sm:mt-2 sm:text-sm"
                  style={{ color: "var(--text-2)" }}
                >
                  Years
                </p>
              </GlassCard>

              <GlassCard className="p-3 text-center transition-transform duration-300 hover:-translate-y-1 sm:p-6">
                <h3
                  className="text-xl font-bold sm:text-2xl lg:text-4xl"
                  style={{ color: "var(--text-1)" }}
                >
                  20+
                </h3>
                <p
                  className="mt-1 text-[11px] sm:mt-2 sm:text-sm"
                  style={{ color: "var(--text-2)" }}
                >
                  Projects
                </p>
              </GlassCard>

              <GlassCard className="p-3 text-center transition-transform duration-300 hover:-translate-y-1 sm:p-6">
                <h3
                  className="text-xl font-bold sm:text-2xl lg:text-4xl"
                  style={{ color: "var(--text-1)" }}
                >
                  100%
                </h3>
                <p
                  className="mt-1 text-[11px] sm:mt-2 sm:text-sm"
                  style={{ color: "var(--text-2)" }}
                >
                  Passion
                </p>
              </GlassCard>
            </div>
          </div>

          {/* ---------------- Right ---------------- */}

          <div className="mx-auto w-full max-w-[360px] sm:max-w-[420px] lg:max-w-none">
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
        className="overflow-hidden p-4 transition-transform duration-300 ease-out sm:p-5"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-3xl">
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
        className="pointer-events-none absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-full opacity-25 blur-[90px] sm:-left-10 sm:-top-10 sm:h-56 sm:w-56 sm:blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--accent), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-full opacity-25 blur-[90px] sm:-bottom-10 sm:-right-10 sm:h-56 sm:w-56 sm:blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--accent-3), transparent 70%)",
        }}
      />
    </div>
  );
}
