"use client";

import { AnimatePresence } from "framer-motion";
import { useWindowManager } from "../context/WindowManagerContext";
import { Window } from "./Window";

import { About } from "@/features/about";
import { Experience } from "@/features/experience";
import { Projects } from "@/features/projects";
import { Terminal } from "@/features/terminal";
import { Resume } from "@/features/resume";
import { Monitor } from "@/features/monitor";
import { Contact } from "@/features/contact";
import { Settings } from "@/features/settings";

import type { AppId } from "@/constants/apps";
import { Portfolio } from "@/features/portfolio";
import { ThoughtProcess } from "@/features/thoughtProcess";
import { BlogsWindow } from "@/features/blogs";

const APP_CONTENT: Record<AppId, React.ComponentType> = {
  about: About,
  experience: Experience,
  projects: Projects,
  terminal: Terminal,
  resume: Resume,
  monitor: Monitor,
  contact: Contact,
  settings: Settings,
  blogs: BlogsWindow,
  portfolio: Portfolio,
  thoughtProcess: ThoughtProcess,
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
