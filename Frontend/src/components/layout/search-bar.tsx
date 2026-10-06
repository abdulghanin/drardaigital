"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { giftCards } from "@/data/products";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import type { Locale } from "@/types";
import { cn } from "@/lib/utils";
import { localizedHref } from "@/lib/locale-url";

export function SearchBar({
  locale,
  placeholder,
  variant = "header",
}: {
  locale: Locale;
  placeholder: string;
  variant?: "header" | "hero";
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return { cards: [], brands: [], categories: [] };
    const q = query.trim().toLowerCase();
    const cards = giftCards
      .filter((g) => g.name[locale].toLowerCase().includes(q) || g.name.en.toLowerCase().includes(q))
      .slice(0, 5);
    const matchedBrands = brands
      .filter((b) => b.name[locale].toLowerCase().includes(q) || b.name.en.toLowerCase().includes(q))
      .slice(0, 4);
    const matchedCategories = categories
      .filter((c) => c.name[locale].toLowerCase().includes(q) || c.name.en.toLowerCase().includes(q))
      .slice(0, 3);
    return { cards, brands: matchedBrands, categories: matchedCategories };
  }, [query, locale]);

  const hasResults = results.cards.length + results.brands.length + results.categories.length > 0;

  const goToListing = (params: string) => {
    setOpen(false);
    setQuery("");
    router.push(localizedHref(locale, `/gift-cards?${params}`));
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border border-border bg-surface transition-all focus-within:border-dara-blue",
          variant === "header" ? "h-11 px-4" : "h-14 px-5 shadow-card"
        )}
      >
        <Search className="h-4 w-4 shrink-0 text-muted" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          type="text"
          placeholder={placeholder}
          className={cn(
            "w-full bg-transparent text-foreground placeholder:text-muted focus:outline-none",
            variant === "hero" ? "text-base" : "text-sm"
          )}
        />
        {query && (
          <button aria-label="Clear" onClick={() => setQuery("")} className="text-muted hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && query.trim() && (
        <div className="absolute start-0 top-full z-40 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-card-hover">
          {!hasResults && (
            <p className="px-4 py-6 text-center text-sm text-muted">
              {locale === "ar" ? "لا توجد نتائج مطابقة" : "No matching results"}
            </p>
          )}
          {results.brands.length > 0 && (
            <div className="border-b border-border p-2">
              {results.brands.map((b) => (
                <button
                  key={b.id}
                  onMouseDown={() => goToListing(`brand=${b.slug}`)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-start text-sm hover:bg-background"
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-bold text-white"
                    style={{ backgroundColor: b.logoColor }}
                  >
                    {b.name.en[0]}
                  </span>
                  {b.name[locale]}
                </button>
              ))}
            </div>
          )}
          {results.categories.length > 0 && (
            <div className="border-b border-border p-2">
              {results.categories.map((c) => (
                <button
                  key={c.id}
                  onMouseDown={() => goToListing(`category=${c.slug}`)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-start text-sm hover:bg-background"
                >
                  <span className="h-2 w-2 rounded-full bg-dara-blue" />
                  {c.name[locale]}
                </button>
              ))}
            </div>
          )}
          {results.cards.length > 0 && (
            <div className="p-2">
              {results.cards.map((g) => (
                <button
                  key={g.id}
                  onMouseDown={() => {
                    setOpen(false);
                    router.push(localizedHref(locale, `/gift-cards/${g.slug}`));
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-start text-sm hover:bg-background"
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold text-white"
                    style={{ backgroundColor: g.color }}
                  >
                    {g.name.en[0]}
                  </span>
                  <span className="truncate">{g.name[locale]}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
