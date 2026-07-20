"use client";

import { useState } from "react";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DEV } from "@/constants/dev";

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2200);
  }

  return (
    <div className="flex h-full">
      <div className="w-[150px] shrink-0 border-r border-white/10 px-2 py-3 text-[12.5px] text-[var(--text-2)]">
        <div className="mb-0.5 rounded-md bg-white/[0.06] px-2 py-2 text-[var(--text-1)]">📥 Inbox</div>
        <div className="mb-0.5 rounded-md px-2 py-2">📤 Sent</div>
        <div className="rounded-md px-2 py-2">⭐ Starred</div>

        <div className="mt-4 px-2">
          <div className="mb-2 text-[10.5px] uppercase tracking-wide text-[var(--text-2)]">Connect</div>
          <div className="flex flex-col gap-2">
            <a
              href={DEV.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-2 text-[12.5px] transition hover:bg-white/10"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
            <a
              href={DEV.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-2 text-[12.5px] transition hover:bg-white/10"
            >
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      <form onSubmit={handleSend} className="flex-1 overflow-auto p-[18px]">
        <Field label="To">
          <input value={DEV.email} readOnly className="field" />
        </Field>
        <Field label="Your Name">
          <input placeholder="Jane Recruiter" className="field" />
        </Field>
        <Field label="Your Email">
          <input type="email" placeholder="jane@company.com" className="field" />
        </Field>
        <Field label="Message">
          <textarea rows={4} placeholder="Let's talk about an opportunity…" className="field resize-none" />
        </Field>
        <Button type="submit" variant="primary">
          {sent ? "Sent ✓" : "Send Message"}
        </Button>
      </form>

      <style jsx>{`
        .field {
          width: 100%;
          margin-top: 6px;
          margin-bottom: 14px;
          padding: 10px 12px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--line);
          color: var(--text-1);
          font-size: 13px;
          outline: none;
          font-family: inherit;
          display: block;
        }
        .field:focus {
          border-color: var(--accent);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-0 block">
      <span className="text-[11px] uppercase tracking-wide text-[var(--text-2)]">{label}</span>
      {children}
    </label>
  );
}
