"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import type { Locale } from "@/types";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  const rest = pathname?.split("/").slice(locale === "ar" ? 2 : 1).join("/") ?? "";

  const otherPath =
    locale === "ar"
      ? `/${rest}`
      : `/ar/${rest}`;

  return (
    <Link
      href={otherPath === "/" ? "/" : otherPath}
      className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface"
      aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
      title={locale === "ar" ? "English" : "العربية"}
    >
      <Languages
        className="h-4 w-4 text-dara-blue"
        aria-hidden="true"
      />
    </Link>
  );
}