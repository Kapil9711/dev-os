"use client";

import { useState } from "react";
import type { AboutTab } from "../types";
import { AboutSidebar } from "./AboutSidebar";
import { CodeTab } from "./tabs/CodeTab";
import { PhotoTab } from "./tabs/PhotoTab";
import { SkillsTab } from "./tabs/SkillsTab";
import { ContactTab } from "./tabs/ContactTab";

export function About() {
  const [tab, setTab] = useState<AboutTab>("code");

  return (
    <div className="flex h-full pb-10 sm:pb-0">
      <AboutSidebar activeTab={tab} onSelectTab={setTab} />

      <div className="hidden flex-1 overflow-auto px-3 @3xl:block">
        {tab === "code" && <CodeTab />}
        {tab === "photo" && <PhotoTab />}
        {tab === "skills" && <SkillsTab />}
        {tab === "contact" && <ContactTab />}
      </div>

      <div className="block flex-1 overflow-auto p-2 @3xl:hidden">
        <CodeTab />
        <PhotoTab />
        <SkillsTab />
        <ContactTab />
      </div>
    </div>
  );
}

export default About;
