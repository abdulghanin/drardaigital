"use client";

import Link from "next/link";
import {
  Apple,
  BookOpen,
  Bus,
  Camera,
  Clapperboard,
  Gamepad2,
  Headphones,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import type { Brand, Locale } from "@/types";
import { localizedHref } from "@/lib/locale-url";

const brandIcons: Record<string, LucideIcon> = {
  amazon: ShoppingBag,
  noon: ShoppingCart,
  apple: Apple,
  netflix: Clapperboard,
  playstation: Gamepad2,
  spotify: Headphones,
  talabat: Utensils,
  carrefour: ShoppingCart,
  shein: Sparkles,
  xbox: Gamepad2,
  itunes: Camera,
  sephora: Sparkles,
  steam: Gamepad2,
  booking: Bus,
};

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
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-16 bg-gradient-to-r from-background via-background/90 to-transparent sm:w-20 rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-16 bg-gradient-to-l from-background via-background/90 to-transparent sm:w-20 rtl:bg-gradient-to-r" />

      <div className="animate-marquee flex w-max gap-3 sm:gap-4">
        {loop.map((b, i) => (
          <Link
            key={`${b.id}-${i}`}
            href={localizedHref(locale, `/gift-cards?brand=${encodeURIComponent(b.slug)}`)}
            tabIndex={i < brands.length ? 0 : -1}
            aria-hidden={i >= brands.length}
            className="group flex w-36 shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface sm:w-40 sm:px-4"
          >
            <span
              className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg text-base font-bold text-white transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12"
              style={{ backgroundColor: b.logoColor }}
            >
              {(() => {
                const Icon = brandIcons[b.slug] ?? BookOpen;
                return <Icon aria-hidden="true" className="h-5 w-5 stroke-[1.8] sm:h-6 sm:w-6" />;
              })()}
              <span className="absolute bottom-1 end-1 text-[8px] font-black uppercase leading-none opacity-70">
                {b.logoInitial || b.name.en[0]}
              </span>
            </span>
            <span className="line-clamp-2 text-start text-sm font-semibold leading-tight text-foreground">{b.name[locale]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
