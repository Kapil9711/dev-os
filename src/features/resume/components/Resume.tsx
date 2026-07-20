"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Globe,
  MapPin,
  Gem,
  Coins,
  HardHat,
  Layers,
  Network,
  Container,
  Cloud,
  Server,
  Search,
  Leaf,
  Gauge,
  FileText,
  GitBranch,
} from "lucide-react";
import { DEV, EDUCATION, SKILL_GROUPS } from "@/constants/dev";
import { EXPERIENCE } from "@/features/experience/data/experience";
import { PROJECTS } from "@/features/projects/data/projects";
import { buildResumeMarkdown } from "../data/resume";

type Tab = "md" | "pdf";

export function Resume() {
  const [tab, setTab] = useState<Tab>("md");
  const [printRequested, setPrintRequested] = useState(false);

  useEffect(() => {
    if (tab === "pdf" && printRequested) {
      const id = requestAnimationFrame(() => {
        window.print();
        setPrintRequested(false);
      });
      return () => cancelAnimationFrame(id);
    }
  }, [tab, printRequested]);

  function handleDownloadPdf() {
    setTab("pdf");
    setPrintRequested(true);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1 border-b border-white/10 px-2.5 py-2 print:hidden">
        <TabButton active={tab === "md"} onClick={() => setTab("md")}>
          📘 Resume.md
        </TabButton>
        <TabButton active={tab === "pdf"} onClick={() => setTab("pdf")}>
          📄 Resume.pdf
        </TabButton>
        <div className="ml-auto flex gap-2">
          <Button onClick={downloadMarkdown}>⬇ .md</Button>
          <Button variant="primary" onClick={handleDownloadPdf}>
            ⬇ Download PDF
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {tab === "md" ? <MarkdownView /> : <PdfPreview />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-1.5 text-xs",
        active
          ? "bg-white/[0.06] font-semibold text-[var(--text-1)]"
          : "text-[var(--text-2)]",
      )}
    >
      {children}
    </button>
  );
}

function MarkdownView() {
  return (
    <div className="px-[26px] py-[22px] text-[13px] leading-[1.75]">
      <h1 className="text-xl font-bold">{DEV.name}</h1>
      <div className="mb-3.5 text-[12.5px] text-[var(--text-2)]">
        {DEV.tagline} · {DEV.experience} experience
      </div>

      <ResumeHeading>Summary</ResumeHeading>
      <p className="text-[var(--text-1)]">{DEV.summary}</p>

      <ResumeHeading>Skills</ResumeHeading>
      {SKILL_GROUPS.map((g) => (
        <div key={g.group} className="mb-1">
          <b>{g.group}:</b> {g.items.join(", ")}
        </div>
      ))}

      <ResumeHeading>Experience</ResumeHeading>
      {EXPERIENCE.map((e) => (
        <div key={e.duration} className="mb-3">
          <div className="font-bold">
            {e.duration} — {e.title}
          </div>
          <ul className="list-disc pl-[18px]">
            {e.projects.map((h) => (
              <li key={h.name}>{h.name}</li>
            ))}
          </ul>
        </div>
      ))}

      <ResumeHeading>Projects</ResumeHeading>
      <ul className="list-disc pl-[18px]">
        {PROJECTS.map((p) => (
          <li key={p.name}>
            <b>{p.name}</b> — {p.desc}
          </li>
        ))}
      </ul>

      <ResumeHeading>Education</ResumeHeading>
      <div>
        {EDUCATION.degree} — {EDUCATION.school}
      </div>

      <ResumeHeading>Contact</ResumeHeading>
      <div className="italic text-[var(--text-2)]">
        {DEV.email} · {DEV.phone} · {DEV.github.replace("https://", "")} ·{" "}
        {DEV.linkedin.replace("https://", "")}
      </div>
    </div>
  );
}

function ResumeHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 mt-5 border-b border-[var(--line)] pb-1.5 text-xs uppercase tracking-wide text-accent-3">
      {children}
    </h2>
  );
}

/* ---------- helpers to bridge existing data -> PDF's nested/derived shape ---------- */

function projectIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("jewel") || n.includes("gem")) return Gem;
  if (n.includes("bullion") || n.includes("gold") || n.includes("trading"))
    return Coins;
  if (n.includes("karigar") || n.includes("worker") || n.includes("hiring"))
    return HardHat;
  return Layers;
}

const ALL_SKILL_ITEMS = SKILL_GROUPS.flatMap((g) => g.items);

// Chips per project: derived by matching known skills against the project description,
// since PROJECTS has no `stack` field yet. Swap for p.stack directly once that field exists.
function projectStack(desc: string): string[] {
  const found = ALL_SKILL_ITEMS.filter((skill) =>
    desc.toLowerCase().includes(skill.toLowerCase()),
  );
  return Array.from(new Set(found)).slice(0, 6);
}

const STRENGTH_ICON_MAP: Record<string, any> = {
  "System Design": Network,
  Linux: Server,
  Docker: Container,
  AWS: Cloud,
  Nginx: Server,
  Elasticsearch: Search,
  MongoDB: Leaf,
  "Performance Optimization": Gauge,
  Documentation: FileText,
  "CI/CD": GitBranch,
};

// Strengths sidebar has no backing field on DEV yet — built from whichever
// priority skills actually exist in SKILL_GROUPS, each paired with an icon.
const STRENGTHS = Object.keys(STRENGTH_ICON_MAP).filter((label) =>
  ALL_SKILL_ITEMS.includes(label as any),
);

function PdfPreview() {
  return (
    <div className="flex justify-center p-6 print:p-0">
      <div className="page">
        <header className="header">
          <div className="name-block">
            <h1>{DEV.name}</h1>
            <div className="role">{DEV.tagline}</div>
          </div>
        </header>

        <div className="contact-bar">
          {DEV.location && (
            <span>
              <MapPin size={11} /> {DEV.location}
            </span>
          )}
          <a href={`mailto:${DEV.email}`}>
            <Mail size={11} /> {DEV.email}
          </a>
          {DEV.phone && (
            <a href={`tel:${DEV.phone}`}>
              <Phone size={11} /> {DEV.phone}
            </a>
          )}
          <a href={DEV.linkedin}>
            <Linkedin size={11} /> {DEV.linkedin.replace("https://", "")}
          </a>
          <a href={DEV.github}>
            <Github size={11} /> {DEV.github.replace("https://", "")}
          </a>
          {DEV.website && (
            <a href={DEV.website}>
              <Globe size={11} /> {DEV.website.replace("https://", "")}
            </a>
          )}
        </div>

        <div className="body">
          <aside className="sidebar">
            <section>
              <h2 className="side-label">Skills</h2>
              {SKILL_GROUPS.map((g) => (
                <div className="skill-group" key={g.group}>
                  <h3>{g.group}</h3>
                  <div className="badges">
                    {g.items.map((s) => (
                      <span className="badge" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {STRENGTHS.length > 0 && (
              <section>
                <h2 className="side-label">Strengths</h2>
                <div className="strengths">
                  {STRENGTHS.map((label) => {
                    const Icon = STRENGTH_ICON_MAP[label];
                    return (
                      <div className="item" key={label}>
                        <Icon size={11} /> {label}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            <section className="edu-block">
              <h2 className="side-label">Education</h2>
              <div className="degree">{EDUCATION.degree}</div>
              <div className="school">{EDUCATION.school}</div>
            </section>
          </aside>

          <main className="main">
            <section>
              <h2 className="section-title">Professional Summary</h2>
              <p className="summary">{DEV.summary}</p>
            </section>

            <section>
              <h2 className="section-title">Experience</h2>
              {EXPERIENCE.map((role) => (
                <div className="job" key={role.company}>
                  <div className="job-head">
                    <h3>
                      {role.title} — {role.company}
                    </h3>
                    <div className="dur">{role.duration}</div>
                  </div>

                  {role.summary && (
                    <p className="job-summary">{role.summary}</p>
                  )}

                  {role.projects.map((project) => (
                    <div className="proj" key={project.name}>
                      <div className="proj-title">{project.name}</div>
                      {project.highlights.length > 0 && (
                        <ul>
                          {project.highlights.map((h) => (
                            <li key={h}>{h}</li>
                          ))}
                        </ul>
                      )}
                      {project.stack.length > 0 && (
                        <div className="stack-row">
                          {project.stack.map((s) => (
                            <span className="stack-chip" key={s}>
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>

      <style jsx>{`
        .page {
          --accent: #0f766e;
          --accent-light: #0f766e14;
          --ink: #0f1a1a;
          --ink-soft: #3d4b4a;
          --ink-faint: #6b7876;
          --line: #e4e9e8;
          --paper: #ffffff;
          --panel: #f7f9f8;

          width: 210mm;
          min-height: 297mm;
          background: var(--paper);
          color: var(--ink);
          font-family: "Inter", Arial, sans-serif;
          box-shadow: 0 4px 40px rgba(15, 26, 26, 0.12);
        }

        .header {
          padding: 9mm 11mm 3mm 11mm;
        }
        .name-block h1 {
          font-family: "Manrope", sans-serif;
          font-weight: 800;
          font-size: 21pt;
          line-height: 1.05;
          letter-spacing: -0.02em;
        }
        .role {
          margin-top: 1.6mm;
          font-family: "Manrope", sans-serif;
          font-weight: 600;
          font-size: 9.6pt;
          color: var(--accent);
        }

        .contact-bar {
          padding: 0 11mm 6mm 11mm;
          border-bottom: 1px solid var(--line);
          display: flex;
          flex-wrap: wrap;
          gap: 3mm 5mm;
        }
        .contact-bar a,
        .contact-bar span {
          display: inline-flex;
          align-items: center;
          gap: 1.6mm;
          font-size: 7.6pt;
          color: var(--ink-soft);
          text-decoration: none;
          white-space: nowrap;
        }
        .contact-bar :global(svg) {
          color: var(--accent);
          flex-shrink: 0;
        }

        .body {
          display: grid;
          grid-template-columns: 64mm 1fr;
        }

        .sidebar {
          background: var(--panel);
          border-right: 1px solid var(--line);
          padding: 6mm 8mm 8mm 10mm;
          display: flex;
          flex-direction: column;
          gap: 5.5mm;
        }
        .side-label {
          font-family: "Manrope", sans-serif;
          font-size: 7.3pt;
          font-weight: 700;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: var(--ink-faint);
          margin-bottom: 3mm;
          display: flex;
          align-items: center;
          gap: 1.8mm;
        }
        .side-label::after {
          content: "";
          height: 1px;
          flex: 1;
          background: var(--line);
        }
        .skill-group {
          margin-bottom: 3.6mm;
        }
        .skill-group:last-child {
          margin-bottom: 0;
        }
        .skill-group h3 {
          font-size: 7pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 2mm;
          opacity: 0.75;
        }
        .badges {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5mm;
        }
        .badge {
          font-size: 7.1pt;
          font-weight: 600;
          color: var(--accent);
          background: var(--accent-light);
          border: 1px solid #0f766e22;
          padding: 1.3mm 2.4mm;
          border-radius: 20px;
          line-height: 1.4;
          white-space: nowrap;
        }

        .strengths {
          display: flex;
          flex-direction: column;
          gap: 1.8mm;
        }
        .strengths .item {
          display: flex;
          align-items: center;
          gap: 2.2mm;
          font-size: 7.5pt;
          color: var(--ink-soft);
          font-weight: 500;
        }
        .strengths .item :global(svg) {
          color: var(--accent);
          flex-shrink: 0;
        }

        .edu-block .degree {
          font-size: 8.3pt;
          font-weight: 700;
          line-height: 1.35;
        }
        .edu-block .school {
          font-size: 7.4pt;
          color: var(--ink-faint);
          margin-top: 1mm;
        }

        .main {
          padding: 6mm 11mm 8mm 9mm;
          display: flex;
          flex-direction: column;
          gap: 5mm;
        }
        .section-title {
          font-family: "Manrope", sans-serif;
          font-size: 8pt;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--accent);
          display: flex;
          align-items: center;
          gap: 2.4mm;
          margin-bottom: 3mm;
        }
        .section-title::after {
          content: "";
          height: 1px;
          flex: 1;
          background: linear-gradient(to right, var(--line), transparent);
        }
        .summary {
          font-size: 8.4pt;
          line-height: 1.55;
          color: var(--ink-soft);
        }

        .job {
          margin-bottom: 4mm;
        }
        .job-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 1mm 3mm;
          margin-bottom: 1.5mm;
        }
        .job-head h3 {
          font-size: 9.3pt;
          font-weight: 700;
          font-family: "Manrope", sans-serif;
        }
        .job-head .dur {
          font-size: 7.3pt;
          font-weight: 600;
          color: var(--ink-faint);
          background: var(--panel);
          padding: 0.7mm 2.2mm;
          border-radius: 6px;
          white-space: nowrap;
        }
        .job-highlights {
          list-style: disc;
          padding-left: 3.2mm;
          margin-bottom: 2.6mm;
          display: flex;
          flex-direction: column;
          gap: 0.9mm;
        }
        .job-highlights li {
          font-size: 7.5pt;
          line-height: 1.45;
          color: var(--ink-soft);
        }

        .proj {
          margin-top: 2.6mm;
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 2.8mm 3.5mm 3mm;
        }
        .proj-title {
          font-size: 8.1pt;
          font-weight: 700;
          margin-bottom: 1.4mm;
          display: flex;
          align-items: center;
          gap: 1.8mm;
        }
        .proj-title :global(svg) {
          color: var(--accent);
        }
        .proj ul {
          list-style: disc;
          padding-left: 3.2mm;
          display: flex;
          flex-direction: column;
          gap: 0.9mm;
        }
        .proj li {
          font-size: 7.5pt;
          line-height: 1.45;
          color: var(--ink-soft);
        }
        .proj li::marker {
          color: var(--accent);
        }

        .stack-row {
          margin-top: 2mm;
          display: flex;
          flex-wrap: wrap;
          gap: 1.3mm;
        }
        .stack-chip {
          font-size: 6.6pt;
          font-weight: 600;
          color: var(--ink-faint);
          background: var(--paper);
          border: 1px solid var(--line);
          padding: 1mm 2mm;
          border-radius: 5px;
        }

        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          .page {
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
}

function downloadMarkdown() {
  const blob = new Blob([buildResumeMarkdown()], { type: "text/markdown" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "resume.md";
  a.click();
  URL.revokeObjectURL(a.href);
}
