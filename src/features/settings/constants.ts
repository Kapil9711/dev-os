import type { AccentOption } from "./types";

export const ACCENTS: readonly AccentOption[] = [
  { id: "indigo", from: "#6C63FF", to: "#4C8DFF" },
  { id: "blue", from: "#4C8DFF", to: "#6C63FF" },
  { id: "violet", from: "#9B7EFF", to: "#6C63FF" },
] as const;
