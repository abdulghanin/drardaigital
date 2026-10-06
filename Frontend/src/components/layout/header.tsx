import Link from "next/link";
import { ShoppingCart, UserRound } from "lucide-react";
import { Logo } from "./logo";
import { SearchBar } from "./search-bar";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { CartCount } from "@/components/cart/cart-count";
import { localizedHref } from "@/lib/locale-url";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/types";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = [
    { href: localizedHref(locale, "/"), label: dict.nav.home },
    { href: localizedHref(locale, "/gift-cards"), label: dict.nav.giftCards },
    { href: localizedHref(locale, "/categories"), label: dict.nav.categories },
    { href: localizedHref(locale, "/offers"), label: dict.nav.offers },
    { href: localizedHref(locale, "/business"), label: dict.nav.business },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-3 sm:gap-4 sm:px-6 lg:h-20 lg:px-8">
        <MobileMenu locale={locale} dict={dict} />
        <Logo locale={locale} />

        <nav className="ms-4 hidden items-center gap-1 lg:flex">
          {links.map((l, i) => (
            <Link
              key={i}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto hidden max-w-xs flex-1 md:block lg:max-w-sm">
          <SearchBar locale={locale} placeholder={dict.header.search} />
        </div>

        <div className="ms-auto flex items-center gap-0.5 sm:gap-1 md:ms-2">
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
          <Link
            href={localizedHref(locale, "/login")}
            aria-label={dict.header.account}
            title={dict.header.account}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-surface sm:h-10 sm:w-10"
          >
            <UserRound className="h-[18px] w-[18px] sm:h-5 sm:w-5" aria-hidden="true" />
          </Link>
          <Link
            href={localizedHref(locale, "/cart")}
            aria-label={dict.header.cart}
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-surface sm:h-10 sm:w-10"
          >
            <ShoppingCart className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
            <CartCount />
          </Link>
         
        </div>
      </div>
    </header>
  );
}
