import {
  Cursor,
  Footer,
  Loader,
  Navigation,
  ScrollProgress,
} from "@/features/portfolio/components/layout";
import Hero from "./components/hero/Hero";
import Journey from "./components/journey/Journey";

import Skills from "./components/skills/Skills";

import Contact from "./components/contact/Contact";
import { Books } from "./components/Books/Books";
import { HowIBuild } from "./components/HowIBuild/HowIBuild";
import Highlights from "./components/Highlights/Highlights";
import LightRays from "./components/common/LightRays";
import About from "./components/About/About";
import StackedCards from "./components/common/StackedCard";
import Projects from "./components/projects/Projects";

export default function Portfolio() {
  const cardData = [
    {
      sub: "Simplified",
      content: "Complex tasks are now simple",
      background: "rgb(64, 122, 255)",
    },
    {
      sub: "Boost Productivity",
      content: "Perform tasks in less time",
      background: "rgb(221, 62, 88)",
    },
    {
      sub: "Facilitated Learning",
      content: "Train anyone from anywhere",
      background: "rgb(186, 113, 245)",
    },
    {
      sub: "Support",
      content: "Now it's 24/7 support",
      background: "rgb(247, 92, 208)",
    },
  ];
  return (
    <>
      <Loader />

      <Cursor />

      <ScrollProgress />

      <Navigation />

      <div
        className="mx-auto"
        style={{
          width: "100%",
          height: "600px",
          position: "absolute",
          zIndex: -10,
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
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

      <main className="relative overflow-x-hidden text-white">
        <Hero />
        <Skills />
        <About />
        <Journey />
        <Projects />
        <Highlights />
        <Books />
        <HowIBuild />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
