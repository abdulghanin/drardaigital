import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAED(amount: number, locale: "ar" | "en" = "en") {
  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-AE" : "en-AE", {
    maximumFractionDigits: 0,
  }).format(amount);
  return locale === "ar" ? `${formatted} د.إ` : `AED ${formatted}`;
}

export function generateOrderNumber() {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `DD-${rand}`;
}

export function generateVoucherCode() {
  const seg = () => Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${seg()}-${seg()}-${seg()}`;
}
