"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { ProductGrid } from "./product-grid";
import type { Brand, Category, GiftCard, Locale } from "@/types";
import type { Dictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

type Sort = "popular" | "price-low" | "price-high";

export function GiftCardsExplorer({
  cards,
  brands,
  categories,
  locale,
  dict,
}: {
  cards: GiftCard[];
  brands: Brand[];
  categories: Category[];
  locale: Locale;
  dict: Dictionary;
}) {
  const params = useSearchParams();
  const [category, setCategory] = useState<string | null>(params.get("category"));
  const [brand, setBrand] = useState<string | null>(params.get("brand"));
  const [discountOnly, setDiscountOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("popular");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...cards];
    if (category) result = result.filter((c) => categories.find((cat) => cat.slug === category)?.id === c.categoryId);
    if (brand) result = result.filter((c) => brands.find((b) => b.slug === brand)?.id === c.brandId);
    if (discountOnly) result = result.filter((c) => !!c.discountPercent);
    if (inStockOnly) result = result.filter((c) => c.availability === "in_stock");

    if (sort === "price-low") result.sort((a, b) => a.priceMin - b.priceMin);
    if (sort === "price-high") result.sort((a, b) => b.priceMin - a.priceMin);
    if (sort === "popular") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [cards, category, brand, discountOnly, inStockOnly, sort, categories, brands]);

  const clearFilters = () => {
    setCategory(null);
    setBrand(null);
    setDiscountOnly(false);
    setInStockOnly(false);
  };

  const activeFilterCount = [category, brand, discountOnly, inStockOnly].filter(Boolean).length;

  const FilterContent = (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">{dict.filters.category}</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(category === c.slug ? null : c.slug)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                category === c.slug
                  ? "border-dara-blue bg-dara-blue text-white"
                  : "border-border text-foreground hover:border-dara-blue/40"
              )}
            >
              {c.name[locale]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">{dict.filters.brand}</h4>
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => setBrand(brand === b.slug ? null : b.slug)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                brand === b.slug
                  ? "border-dara-blue bg-dara-blue text-white"
                  : "border-border text-foreground hover:border-dara-blue/40"
              )}
            >
              {b.name[locale]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">{dict.filters.discount}</h4>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
          <input
            type="checkbox"
            checked={discountOnly}
            onChange={(e) => setDiscountOnly(e.target.checked)}
            className="h-4 w-4 rounded accent-dara-blue"
          />
          {locale === "ar" ? "عرض البطاقات المخفضة فقط" : "Discounted cards only"}
        </label>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">{dict.filters.availability}</h4>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 rounded accent-dara-blue"
          />
          {locale === "ar" ? "المتوفر فقط" : "In stock only"}
        </label>
      </div>

      {activeFilterCount > 0 && (
        <button onClick={clearFilters} className="text-start text-sm font-semibold text-dara-blue hover:underline">
          {dict.filters.clear}
        </button>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-border bg-surface p-5">
          <h3 className="mb-5 text-base font-bold text-foreground">{dict.filters.title}</h3>
          {FilterContent}
        </div>
      </aside>

      <div>
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {filtered.length} {dict.filters.results}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-semibold text-foreground lg:hidden"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {dict.filters.title}
              {activeFilterCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-dara-blue text-[10px] text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="appearance-none rounded-full border border-border bg-surface py-2 ps-3.5 pe-8 text-xs font-semibold text-foreground focus:outline-none"
              >
                <option value="popular">{dict.filters.sortPopular}</option>
                <option value="price-low">{dict.filters.sortPriceLow}</option>
                <option value="price-high">{dict.filters.sortPriceHigh}</option>
              </select>
              <ChevronDown className="pointer-events-none absolute end-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
            </div>
          </div>
        </div>

        <ProductGrid cards={filtered} locale={locale} dict={dict} />
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-dara-dark/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-surface p-5 pb-8">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">{dict.filters.title}</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-background">
                <X className="h-5 w-5" />
              </button>
            </div>
            {FilterContent}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 h-12 w-full rounded-full bg-dara-blue text-sm font-semibold text-white"
            >
              {dict.filters.apply} ({filtered.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
