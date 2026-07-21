import type { TableProps } from "../types";

export default function Table({ children }: TableProps) {
  return (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}
