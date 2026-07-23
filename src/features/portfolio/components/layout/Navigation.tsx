"use client";

import { useEffect, useRef, useState } from "react";

import { NAVIGATION } from "../../constants";
import Container from "../common/Container";
import NavigationItem from "./NavigationItem";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(NAVIGATION[0]?.id ?? "");
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
  } | null>(null);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rowRef = useRef<HTMLDivElement>(null);

  // scroll-aware header background — sentinel-based, no scroll listener
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]: any) => setScrolled(!entry.isIntersecting),
      {
        threshold: 0,
      },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // active-section tracking
  useEffect(() => {
    const sections = NAVIGATION.map((item) =>
      document.getElementById(item.id),
    ).filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // slide the indicator pill to whichever item is active
  useEffect(() => {
    const el = itemRefs.current[activeId];
    const row = rowRef.current;
    if (!el || !row) return;

    const rowRect = row.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicator({ left: elRect.left - rowRect.left, width: elRect.width });
  }, [activeId]);

  // close mobile menu on escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const THRESHOLD = 10;

    const handleScroll = () => {
      const current = window.scrollY;
      const diff = current - lastScrollY;

      if (current < 80) {
        setVisible(true);
        lastScrollY = current;
        return;
      }

      if (Math.abs(diff) < THRESHOLD) return;

      if (diff > 0) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {/* 1px sentinel sits above the page content; header styles react to it going offscreen */}
      <div
        ref={sentinelRef}
        className="absolute top-0 h-px w-full"
        aria-hidden="true"
      />

      <header
        className="sticky top-0 z-50 pt-4 transition-transform duration-300"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-150%) hidden",
        }}
      >
        <Container>
          <nav
            className="relative flex h-16 items-center justify-between rounded-full border px-4 transition-[background-color,border-color,box-shadow] duration-500 sm:px-6"
            style={{
              background: scrolled ? "var(--glass-strong)" : "var(--glass)",
              borderColor: "var(--line)",
              backdropFilter: "blur(var(--blur))",
              WebkitBackdropFilter: "blur(var(--blur))",
              boxShadow: scrolled
                ? "0 8px 30px -12px rgba(0,0,0,0.45)"
                : "none",
            }}
          >
            <a
              href="#hero"
              className="shrink-0 text-lg font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ color: "var(--text-1)" }}
            >
              VS<span style={{ color: "var(--accent)" }}>.</span>
            </a>

            {/* ---------------- Desktop nav ---------------- */}
            <div
              ref={rowRef}
              className="relative hidden items-center gap-1 lg:flex"
            >
              {indicator && (
                <span
                  className="absolute top-1/2 h-9 -translate-y-1/2 rounded-full transition-all duration-300 ease-out"
                  style={{
                    left: indicator.left,
                    width: indicator.width,
                    background: "var(--glass-strong)",
                    border: "1px solid var(--line)",
                  }}
                />
              )}

              {NAVIGATION.map((item) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[item.id] = el;
                  }}
                  className="relative z-10 px-1"
                >
                  <NavigationItem item={item} />
                  <span
                    className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full transition-all duration-300"
                    style={{
                      background: "var(--accent)",
                      opacity: activeId === item.id ? 1 : 0,
                      transform: `translateX(-50%) scale(${activeId === item.id ? 1 : 0})`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* ---------------- Desktop CTA ---------------- */}

            <a
              href="#contact"
              className="hidden shrink-0 items-center rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 lg:inline-flex"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-2))",
                color: "var(--text-1)",
              }}
            >
              Let&apos;s Talk
            </a>

            {/* ---------------- Mobile toggle ---------------- */}
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors lg:hidden"
              style={{ borderColor: "var(--line)", background: "var(--glass)" }}
            >
              <span className="relative flex h-4 w-4 flex-col items-center justify-center">
                <span
                  className="absolute h-px w-4 rounded-full transition-all duration-300"
                  style={{
                    background: "var(--text-1)",
                    transform: mobileOpen
                      ? "rotate(45deg)"
                      : "translateY(-4px)",
                  }}
                />
                <span
                  className="absolute h-px w-4 rounded-full transition-all duration-300"
                  style={{
                    background: "var(--text-1)",
                    opacity: mobileOpen ? 0 : 1,
                  }}
                />
                <span
                  className="absolute h-px w-4 rounded-full transition-all duration-300"
                  style={{
                    background: "var(--text-1)",
                    transform: mobileOpen
                      ? "rotate(-45deg)"
                      : "translateY(4px)",
                  }}
                />
              </span>
            </button>
          </nav>

          {/* ---------------- Mobile panel ---------------- */}
          <div
            className="duration-400 grid overflow-hidden transition-[grid-template-rows,opacity,margin-top] ease-out lg:hidden"
            style={{
              gridTemplateRows: mobileOpen ? "1fr" : "0fr",
              opacity: mobileOpen ? 1 : 0,
              marginTop: mobileOpen ? "0.75rem" : "0",
            }}
          >
            <div className="min-h-0">
              <div
                className="flex flex-col gap-1 rounded-3xl border p-3"
                style={{
                  background: "var(--glass-strong)",
                  borderColor: "var(--line)",
                  backdropFilter: "blur(var(--blur))",
                  WebkitBackdropFilter: "blur(var(--blur))",
                }}
              >
                {NAVIGATION.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors"
                    style={{
                      color:
                        activeId === item.id
                          ? "var(--text-1)"
                          : "var(--text-2)",
                      background:
                        activeId === item.id ? "var(--glass)" : "transparent",
                    }}
                  >
                    {item.label}
                    {activeId === item.id && (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                    )}
                  </a>
                ))}

                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-medium"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent), var(--accent-2))",
                    color: "var(--text-1)",
                  }}
                >
                  Let&apos;s Talk
                </a>
              </div>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}
