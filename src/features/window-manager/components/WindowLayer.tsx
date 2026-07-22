"use client";

import { AnimatePresence } from "framer-motion";
import { useWindowManager } from "../context/WindowManagerContext";
import { Window } from "./Window";

import { About } from "@/features/about/components/About";
import { Experience } from "@/features/experience/components/Experience";
import { Projects } from "@/features/projects/components/Projects";
import { Terminal } from "@/features/terminal/components/Terminal";
import { Resume } from "@/features/resume/components/Resume";
import { Monitor } from "@/features/monitor/components/Monitor";
import { Contact } from "@/features/contact/components/Contact";
import { Settings } from "@/features/settings/components/Settings";

import type { AppId } from "@/constants/apps";
import Portfolio from "@/features/portfolio/PortfolioPage";

const APP_CONTENT: Record<AppId, React.ComponentType> = {
  about: About,
  experience: Experience,
  projects: Projects,
  terminal: Terminal,
  resume: Resume,
  monitor: Monitor,
  contact: Contact,
  settings: Settings,
  portfolio: Portfolio,
};

export function WindowLayer() {
  const { openOrder } = useWindowManager();

  return (
    <div className="absolute z-50">
      <AnimatePresence mode="popLayout">
        {openOrder.map((id) => {
          const Content = APP_CONTENT[id];

          return (
            <Window key={id} id={id}>
              <Content />
            </Window>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
