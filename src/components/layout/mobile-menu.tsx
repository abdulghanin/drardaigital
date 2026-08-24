"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/types";

export function MobileMenu({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/gift-cards`, label: dict.nav.giftCards },
    { href: `/${locale}/gift-cards`, label: dict.nav.categories },
    { href: `/${locale}/offers`, label: dict.nav.offers },
    { href: `/${locale}/business`, label: dict.nav.business },
  ];

  return (
    <div className="lg:hidden">
      <button
        aria-label="Menu"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-surface"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-dara-dark/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 start-0 flex w-[82%] max-w-sm flex-col bg-surface p-6 shadow-card-hover animate-fade-up">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-lg font-bold text-foreground">
                {locale === "ar" ? "القائمة" : "Menu"}
              </span>
              <button aria-label="Close" onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-background">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {links.map((l, i) => (
                <Link
                  key={i}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-background"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
