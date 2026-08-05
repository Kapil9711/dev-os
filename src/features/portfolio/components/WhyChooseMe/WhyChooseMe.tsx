"use client";

import Container from "../common/Container";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";

const STACK = [
  {
    layer: "L0",
    label: "Physical Systems",
    source: "Mechanical Engineering",
    copy: "Trained to design systems that have to survive the real world — where every part has a tolerance, a failure mode, and a cost. That discipline shows up in how I architect software: nothing is accidental, and edge cases aren't an afterthought.",
  },
  {
    layer: "L1",
    label: "Hardware & Electronics",
    source: "Motherboard & PCB Manufacturing",
    copy: "I assembled motherboards and PCBs — CPUs, RAM, chipsets — before I shipped production code. I know what's happening below the OS, which means I write software that respects the hardware it actually runs on, not just the framework it's built in.",
  },
  {
    layer: "L2",
    label: "Software & Product",
    source: "Full-Stack Engineering",
    copy: "Frontend, backend, APIs, databases, DevOps — end to end. I build for scale on purpose, because I've watched what happens when systems aren't: in machines, in factories, and now in code.",
  },
];

export default function WhyChooseMe() {
  return (
    <Section id="why-choose-me" className="relative py-10">
      <Container>
        <SectionHeading
          eyebrow="Why Work With Me"
          title="From Circuits to Code"
          description="Most engineers learn software from a browser tab. I learned it after machine design and motherboard lines — so I build with the whole stack in mind, not just the part that renders."
        />

        <div className="mt-14 flex flex-col">
          {STACK.map((item, i) => (
            <div key={item.layer} className="flex gap-6">
              {/* spine */}
              <div className="flex flex-col items-center">
                <span
                  className="h-3 w-3 flex-shrink-0 rounded-full"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 10px var(--accent)",
                  }}
                />
                {i < STACK.length - 1 && (
                  <span
                    className="mt-1 w-px flex-1"
                    style={{
                      background:
                        "linear-gradient(to bottom, var(--accent), var(--accent-2))",
                      opacity: 0.3,
                    }}
                  />
                )}
              </div>

              {/* content */}
              <div className={i < STACK.length - 1 ? "pb-12" : ""}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span
                    className="font-mono text-xs font-semibold tracking-[0.2em]"
                    style={{ color: "var(--accent)" }}
                  >
                    {item.layer}
                  </span>
                  <h3 className="text-xl font-semibold text-[var(--text-1)]">
                    {item.label}
                  </h3>
                  <span className="text-xs uppercase tracking-[0.15em] text-[var(--text-2)]">
                    {item.source}
                  </span>
                </div>

                <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[var(--text-2)]">
                  {item.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
