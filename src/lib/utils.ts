import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null || num === "") return "0";
  const n = typeof num === "string" ? parseFloat(num) : num;
  if (isNaN(n)) return String(num);
  return n.toLocaleString();
}
