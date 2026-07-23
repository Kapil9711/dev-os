import {
  Cursor,
  Footer,
  Loader,
  Navigation,
  ScrollProgress,
} from "@/features/portfolio/components/layout";
import Hero from "./components/hero/Hero";
import Journey from "./components/journey/Journey";
import Projects from "./components/projects/Projects";
import Skills from "./components/skills/Skills";
import Experience from "./components/experience/Experience";
import Contact from "./components/contact/Contact";
import { Books } from "./components/Books/Books";
import { HowIBuild } from "./components/HowIBuild/HowIBuild";
import Highlights from "./components/Highlights/Highlights";
import LightRays from "./components/common/LightRays";

export default function Portfolio() {
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
        <Journey />

        <Highlights />

        {/* <Projects /> */}

        <Books />

        <Experience />

        <Contact />

        <HowIBuild />
      </main>

      <Footer />
    </>
  );
}
