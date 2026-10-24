"use client";
import { Desktop } from "@/features/desktop/Desktop";
import { Portfolio } from "@/features/portfolio";
import { useMobile } from "@/hooks/useMobile";

export default function HomePage() {
  const isMobile = useMobile();
  return (
    <main className="h-full w-full">
      <Desktop />
    </main>
  );
}
