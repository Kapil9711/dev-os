"use client";

import { useState } from "react";
import { DEV } from "@/constants/dev";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2400);
  }

  return (
    <form onSubmit={handleSend} className="wbody-scroll flex-1 overflow-auto p-6 space-y-4">
      <Field label="Recipient Target">
        <input value={DEV.email} readOnly className="contact-field cursor-default text-cyan-300 font-mono" />
      </Field>
      <Field label="Your Name // Handle">
        <input placeholder="Jane Recruiter" className="contact-field" required />
      </Field>
      <Field label="Return Comms Address">
        <input
          type="email"
          placeholder="jane@company.com"
          className="contact-field"
          required
        />
      </Field>
      <Field label="Encrypted Transmission">
        <textarea
          rows={4}
          placeholder="Let's collaborate on an exciting high-impact engineering opportunity…"
          className="contact-field resize-none"
          required
        />
      </Field>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl border border-cyan-400 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 px-5 py-2.5 font-mono text-[13px] font-bold text-black shadow-[0_0_15px_rgba(0,240,255,0.4)] transition hover:brightness-110 active:scale-95"
      >
        {sent ? (
          <>
            <CheckCircle2 size={16} />
            <span>TRANSMITTED // CONFIRMED</span>
          </>
        ) : (
          <>
            <Send size={15} />
            <span>TRANSMIT DISPATCH</span>
          </>
        )}
      </button>

      <style jsx>{`
        .contact-field {
          width: 100%;
          margin-top: 6px;
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(3, 6, 18, 0.75);
          border: 1px solid rgba(0, 240, 255, 0.2);
          color: #e0f7fa;
          font-size: 13px;
          outline: none;
          font-family: inherit;
          display: block;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .contact-field:focus {
          border-color: #00f0ff;
          box-shadow: 0 0 12px rgba(0, 240, 255, 0.25);
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
    <label className="block">
      <span className="font-mono text-[10.5px] uppercase tracking-wider text-cyan-400/80">
        {"//"} {label}
      </span>
      {children}
    </label>
  );
}
