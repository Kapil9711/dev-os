"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DEV } from "@/constants/dev";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2200);
  }

  return (
    <form onSubmit={handleSend} className="flex-1 overflow-auto p-[18px]">
      <Field label="To">
        <input value={DEV.email} readOnly className="contact-field" />
      </Field>
      <Field label="Your Name">
        <input placeholder="Jane Recruiter" className="contact-field" />
      </Field>
      <Field label="Your Email">
        <input
          type="email"
          placeholder="jane@company.com"
          className="contact-field"
        />
      </Field>
      <Field label="Message">
        <textarea
          rows={4}
          placeholder="Let's talk about an opportunity…"
          className="contact-field resize-none"
        />
      </Field>
      <Button type="submit" variant="primary">
        {sent ? "Sent ✓" : "Send Message"}
      </Button>

      <style jsx>{`
        .contact-field {
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
        .contact-field:focus {
          border-color: var(--accent);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="mb-0 block">
      <span className="text-[11px] uppercase tracking-wide text-[var(--text-2)]">
        {label}
      </span>
      {children}
    </label>
  );
}
