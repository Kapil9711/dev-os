export type LineType = "input" | "output" | "error" | "link";

export interface TerminalLineItem {
  id: number;
  type: LineType;
  text: string;
  href?: string;
}

export interface TerminalFileMap {
  [fileName: string]: string;
}
