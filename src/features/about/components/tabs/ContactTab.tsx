"use client";

import { DEV } from "@/constants/dev";

export function ContactTab() {
  return (
    <div className="p-4 px-5 font-mono text-[13px] leading-[1.85]">
      <div className="italic text-[#5b5e70]">{"// reach out"}</div>
      <div>
        <span className="text-accent-3">export const</span>{" "}
        <span className="text-accent-2">contact</span> ={" "}
        <span className="text-[var(--text-2)]">{"{"}</span>
      </div>
      <div className="pl-4">
        email: <span className="text-success">&quot;{DEV.email}&quot;</span>,
      </div>
      <div className="pl-4">
        github: <span className="text-success">&quot;{DEV.github}&quot;</span>,
      </div>
      <div className="pl-4">
        linkedin:{" "}
        <span className="text-success">&quot;{DEV.linkedin}&quot;</span>
      </div>
      <div className="text-[var(--text-2)]">{"}"}</div>
    </div>
  );
}
