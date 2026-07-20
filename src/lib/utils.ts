import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a Date as a two-digit HH:MM clock string. */
export function formatClock(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/** Slugify a label into a lowercase, dash-free id-safe string. */
export function slugify(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}
