import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-[#05060b] px-6 text-center">
      <div className="text-sm font-bold tracking-wide text-[var(--text-1)]">
        vaib<span className="text-accent-3">OS</span>
      </div>
      <h1 className="text-2xl font-extrabold text-[var(--text-1)]">404 — Window not found</h1>
      <p className="max-w-sm text-sm text-[var(--text-2)]">
        This process doesn&apos;t exist on the desktop. Head back and open an app from the dock.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-gradient-to-br from-accent to-accent-2 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
      >
        Back to desktop
      </Link>
    </div>
  );
}
