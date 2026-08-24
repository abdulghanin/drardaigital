import Link from "next/link";
import Image from "next/image";
import { AtSign, Globe, MessageCircle, Share2 } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/types";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const productLinks = [
    { href: `/${locale}/gift-cards`, label: dict.footer.giftCards },
    { href: `/${locale}/gift-cards`, label: dict.footer.categories },
    { href: `/${locale}/offers`, label: dict.footer.offers },
    { href: `/${locale}/business`, label: dict.footer.business },
  ];
  const companyLinks = [
    { href: `/${locale}`, label: dict.footer.about },
    { href: `/${locale}`, label: dict.footer.help },
    { href: `/${locale}`, label: dict.footer.privacy },
    { href: `/${locale}`, label: dict.footer.terms },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3 flex items-center gap-2.5">
              <Image src="/images/dara-logo-mark.png" alt="Dara Digital" width={32} height={32} className="h-8 w-8" />
              <span className="font-display text-base font-bold text-foreground">
                {locale === "ar" ? "دارا ديجيتال" : "DARA DIGITAL"}
              </span>
            </div>
            <p className="max-w-[220px] text-sm text-muted">{dict.footer.tagline}</p>
            <div className="mt-5 flex items-center gap-2">
              {[AtSign, MessageCircle, Share2, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-dara-blue hover:text-dara-blue"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">{dict.footer.products}</h4>
            <ul className="space-y-3">
              {productLinks.map((l, i) => (
                <li key={i}>
                  <Link href={l.href} className="text-sm text-muted hover:text-dara-blue">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">{dict.footer.company}</h4>
            <ul className="space-y-3">
              {companyLinks.map((l, i) => (
                <li key={i}>
                  <Link href={l.href} className="text-sm text-muted hover:text-dara-blue">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              {locale === "ar" ? "التفضيلات" : "Preferences"}
            </h4>
            <div className="flex items-center gap-2">
              <LanguageSwitcher locale={locale} />
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Dara Digital. {dict.footer.rights}.
          </p>
          <p className="text-xs text-muted">{locale === "ar" ? "صُنع بكل حب في الإمارات" : "Made with care in the UAE"}</p>
        </div>
      </div>
    </footer>
  );
}
