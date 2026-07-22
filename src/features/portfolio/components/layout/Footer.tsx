import Container from "../common/Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <Container className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          Built with Next.js • React • GSAP
        </p>
      </Container>
    </footer>
  );
}
