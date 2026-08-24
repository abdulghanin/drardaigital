"use client";

import Link from "next/link";
import type { Brand, Locale } from "@/types";

/**
 * Auto-scrolling infinite marquee of brand chips. The list is duplicated
 * once so the CSS animation can loop seamlessly (-50% translate = exactly
 * one copy's width). Pauses on hover/focus so links stay clickable, and is
 * fully disabled under prefers-reduced-motion via global CSS.
 */
export function BrandsMarquee({ brands, locale }: { brands: Brand[]; locale: Locale }) {
  const loop = [...brands, ...brands];

  return (
    <div className="marquee-track relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-10 bg-gradient-to-r from-background to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-10 bg-gradient-to-l from-background to-transparent sm:w-20" />

      <div className="animate-marquee flex w-max gap-3 sm:gap-4">
        {loop.map((b, i) => (
          <Link
            key={`${b.id}-${i}`}
            href={`/${locale}/gift-cards?brand=${b.slug}`}
            tabIndex={i < brands.length ? 0 : -1}
            aria-hidden={i >= brands.length}
            className="group flex w-24 shrink-0 flex-col items-center gap-2.5 rounded-2xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:shadow-card sm:w-28"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl text-base font-bold text-white transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14"
              style={{ backgroundColor: b.logoColor }}
            >
              {b.name.en[0]}
            </span>
            <span className="line-clamp-1 text-center text-xs font-medium text-foreground">{b.name[locale]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
