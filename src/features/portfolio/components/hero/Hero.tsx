"use client";

import { useCallback } from "react";
import { PROFILE } from "../../data";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Container from "../common/Container";
import Heading from "../common/Heading";
import Paragraph from "../common/Paragraph";
import Section from "../common/Section";
import HeroScene from "../three/HeroScene";
import { useMobile } from "@/hooks/useMobile";
import { HeroStats } from "./HeroStats";
import { HeroTiltCard } from "./HeroTiltCard";

export default function Hero() {
  const isMobile = useMobile();

  const scrollToSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const container = document.getElementById(
      "window-container-portfolio",
    ) as HTMLDivElement | null;

    if (container && typeof container.scrollTo === "function") {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const targetTop =
        targetRect.top - containerRect.top + container.scrollTop;

      container.scrollTo({
        top: Math.max(0, targetTop - 20),
        behavior: "smooth",
      });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    try {
      window.history.replaceState(null, "", `#${id}`);
    } catch {}
  }, []);

  return (
    <Section
      id="hero"
      className="relative flex flex-col overflow-hidden pb-10 pt-10 @5xl:pt-0 @7xl:min-h-[100svh] @7xl:min-h-screen @7xl:justify-center @7xl:pb-0 @7xl:pt-0"
    >
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
          {/* Left Column */}
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

            <div className="mt-8 flex flex-wrap gap-3 @5xl:mt-10 @5xl:gap-4">
              <Button
                href={isMobile ? "#projects" : "#"}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("projects");
                }}
                variant="primary"
              >
                View Projects
              </Button>
              <Button
                href={isMobile ? "#contact" : "#"}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                variant="secondary"
              >
                Contact Me
              </Button>
            </div>

            <HeroStats />
          </div>

          {/* Right Column */}
          <div className="mx-auto w-full max-w-[360px] @5xl:max-w-[420px] @7xl:max-w-none">
            <HeroTiltCard />
          </div>
        </div>
      </Container>
    </Section>
  );
}
