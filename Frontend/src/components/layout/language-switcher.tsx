"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import type { Locale } from "@/types";
import { localizedHref } from "@/lib/locale-url";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale = locale === "ar" ? "en" : "ar";
  const otherPath = localizedHref(nextLocale, pathname ?? "/");

  return (
    <Link
      href={otherPath}
      onClick={(event) => {
        const suffix = `${window.location.search}${window.location.hash}`;
        if (!suffix) return;
        event.preventDefault();
        router.push(`${localizedHref(nextLocale, window.location.pathname)}${suffix}`);
      }}
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