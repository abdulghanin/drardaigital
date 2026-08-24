"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/types";

export function MobileMenu({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

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
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 transition-opacity duration-300 ease-out ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className="absolute inset-0 cursor-default bg-dara-dark/40"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={locale === "ar" ? "القائمة" : "Menu"}
          className={`absolute inset-y-0 start-0 flex max-h-screen w-[min(86vw,22rem)] flex-col overflow-y-auto bg-surface p-5 shadow-card-hover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-6 ltr:origin-left rtl:origin-right ${
            open ? "translate-x-0" : "ltr:-translate-x-full rtl:translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="font-display text-lg font-bold text-foreground">
              {locale === "ar" ? "القائمة" : "Menu"}
            </span>
            <button
              aria-label="Close menu"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-background"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1" aria-label={locale === "ar" ? "التنقل" : "Navigation"}>
            {links.map((l, i) => (
              <Link
                key={i}
                href={l.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="rounded-xl px-3 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-background"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
