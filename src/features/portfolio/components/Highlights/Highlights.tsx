"use client";

import MagicBento from "../common/MagicBennto";
import Container from "../common/Container";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import { HIGHLIGHTS } from "../../constants/highlights";
import LightRays from "../common/LightRays";

import RippleGrid from "../common/RipleGrid";
import SideRays from "../common/SideRays";
import Lightfall from "../common/LightFall";
import LiquidEther from "../common/LiquidEthor";

export default function Highlights() {
  return (
    <Section id="highlights">
      <div
        style={{
          width: "100%",
          height: "full",
          position: "absolute",
          zIndex: -10,
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#9879f4"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      <Container>
        <SectionHeading
          eyebrow="What I Bring"
          title="Core Strengths"
          description="The areas I focus on across every project — from architecture to shipping."
        />

        <div className="mt-10 flex w-full justify-center">
          <MagicBento
            items={HIGHLIGHTS}
            textAutoHide
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt
            enableMagnetism
            clickEffect
            spotlightRadius={280}
            particleCount={8}
            glowColor="108, 99, 255" /* = var(--accent) #6c63ff as raw RGB */
          />
        </div>
      </Container>
    </Section>
  );
}
