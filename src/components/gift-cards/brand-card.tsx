import Link from "next/link";
import type { Brand, Locale } from "@/types";

export function BrandCard({ brand, locale }: { brand: Brand; locale: Locale }) {
  return (
    <Link
      href={`/${locale}/gift-cards?brand=${brand.slug}`}
      className="group flex w-24 shrink-0 flex-col items-center gap-2.5 rounded-2xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:shadow-card sm:w-28 lg:w-full"
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-xl text-base font-bold text-white sm:h-14 sm:w-14"
        style={{ backgroundColor: brand.logoColor }}
      >
        {brand.name.en[0]}
      </span>
      <span className="line-clamp-1 text-center text-xs font-medium text-foreground">{brand.name[locale]}</span>
    </Link>
  );
}
