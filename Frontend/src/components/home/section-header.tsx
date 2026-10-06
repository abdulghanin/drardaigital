import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/types";
import { localizedHref } from "@/lib/locale-url";

export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel,
  locale,
}: {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  locale: Locale;
}) {
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  return (
    <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link
          href={localizedHref(locale, viewAllHref)}
          className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-dara-blue hover:underline sm:flex"
        >
          {viewAllLabel}
          <Arrow className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
