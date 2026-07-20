export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2.5 text-[10.5px] font-semibold uppercase tracking-wider text-[var(--text-2)]">
      {children}
    </div>
  );
}
