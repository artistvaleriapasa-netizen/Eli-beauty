import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind merge for conflict resolution.
 * Standard helper folosit de toate componentele shadcn/ui.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatează preț din bani (cents) în format lizibil cu monedă.
 * Ex: formatPrice(15000, "MDL") => "150,00 MDL"
 */
export function formatPrice(cents: number, currency: "MDL" | "EUR" | "RON" = "MDL"): string {
  const value = cents / 100;
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}

/**
 * Formatează durată în minute → "1h 30min" sau "45min"
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  return rem === 0 ? `${hours}h` : `${hours}h ${rem}min`;
}
