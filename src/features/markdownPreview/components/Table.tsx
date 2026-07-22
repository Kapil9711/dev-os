import type { TableProps } from "../types";

export default function Table({ children }: TableProps) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-white/10 bg-[rgba(20,20,28,0.65)] px-3 py-2 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-2xl">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          {children}
        </table>
      </div>
    </div>
  );
}
