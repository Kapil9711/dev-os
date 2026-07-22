"use client";

import { PROFILE, SOCIALS } from "../../data";

import Badge from "../common/Badge";
import Button from "../common/Button";
import Container from "../common/Container";
import GlassCard from "../common/GlassCard";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";

export default function Contact() {
  return (
    <Section id="contact">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something Great Together"
          description="I'm always interested in discussing new opportunities, exciting projects, or simply connecting with other developers."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_380px]">
          <GlassCard className="p-10">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white">Email</h3>

                <a
                  href={`mailto:${PROFILE.email}`}
                  className="mt-2 block text-lg text-blue-400 hover:text-blue-300"
                >
                  {PROFILE.email}
                </a>
              </div>

              {PROFILE.phone && (
                <div>
                  <h3 className="text-xl font-semibold text-white">Phone</h3>

                  <a
                    href={`tel:${PROFILE.phone}`}
                    className="mt-2 block text-lg text-white/70"
                  >
                    {PROFILE.phone}
                  </a>
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold text-white">Location</h3>

                <p className="mt-2 text-white/70">{PROFILE.location}</p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button href={`mailto:${PROFILE.email}`} variant="primary">
                  Email Me
                </Button>

                <Button href={PROFILE.resume} variant="secondary">
                  Resume
                </Button>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-10">
            <h3 className="text-2xl font-bold text-white">Connect</h3>

            <div className="mt-8 space-y-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 p-4 transition-all duration-300 hover:border-blue-400 hover:bg-white/5"
                >
                  <span className="font-medium text-white">{social.label}</span>

                  <span className="text-white/40">→</span>
                </a>
              ))}
            </div>

            <div className="mt-10">
              <Badge>
                {PROFILE.availableForWork
                  ? "Open to Opportunities"
                  : "Currently Unavailable"}
              </Badge>
            </div>
          </GlassCard>
        </div>
      </Container>
    </Section>
  );
}
