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

export default function Portfolio() {
  return (
    <>
      <Loader />

      <Cursor />

      <ScrollProgress />

      <Navigation />

      <main className="relative overflow-x-hidden text-white">
        <Hero />

        <Journey />

        <Projects />

        <Skills />

        <Experience />

        <Contact />
      </main>

      <Footer />
    </>
  );
}
