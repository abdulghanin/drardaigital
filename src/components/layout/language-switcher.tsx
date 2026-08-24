"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const rest = pathname?.split("/").slice(2).join("/") ?? "";
  const other: Locale = locale === "ar" ? "en" : "ar";

  return (
    <Link
      href={`/${other}/${rest}`}
      className="flex h-10 items-center gap-1 rounded-full px-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
      aria-label="Switch language"
    >
      <span className={locale === "ar" ? "text-dara-blue" : "text-muted"}>AR</span>
      <span className="text-muted">|</span>
      <span className={locale === "en" ? "text-dara-blue" : "text-muted"}>EN</span>
    </Link>
  );
}
