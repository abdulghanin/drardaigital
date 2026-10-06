import Link from "next/link";
import { Star, Zap } from "lucide-react";
import { PriceDisplay } from "@/components/ui/price-display";
import { Badge } from "@/components/ui/badge";
import { getBrandById } from "@/data/brands";
import type { GiftCard, Locale } from "@/types";
import type { Dictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";
import { localizedHref } from "@/lib/locale-url";

export function GiftCardCard({
  card,
  locale,
  dict,
}: {
  card: GiftCard;
  locale: Locale;
  dict: Dictionary;
}) {
  const brand = getBrandById(card.brandId);

  return (
    <Link
      href={localizedHref(locale, `/gift-cards/${card.slug}`)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div
        className="relative flex h-32 items-center justify-center overflow-hidden sm:h-36"
        style={{
          background: `linear-gradient(135deg, ${card.color} 0%, #035AF7 120%)`,
        }}
      >
        <span className="font-display text-3xl font-extrabold tracking-tight text-white/90 sm:text-4xl">
          {card.name.en[0]}
        </span>
        {card.discountPercent && (
          <Badge className="absolute top-2.5 start-2.5 !bg-white/95 !text-dara-dark" variant="primary">
            -{card.discountPercent}%
          </Badge>
        )}
        {card.availability !== "in_stock" && (
          <div className="absolute inset-0 flex items-center justify-center bg-dara-dark/50">
            <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-dara-dark">
              {card.availability === "low_stock" ? (locale === "ar" ? "كمية محدودة" : "Low Stock") : dict.states.unavailable}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-xs font-medium text-muted">{brand?.name[locale]}</span>
          <span className="flex items-center gap-1 text-xs font-semibold text-foreground">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {card.rating}
          </span>
        </div>
        <h3 className="line-clamp-1 text-sm font-semibold text-foreground sm:text-base">
          {card.name[locale]}
        </h3>
        <PriceDisplay min={card.priceMin} max={card.priceMax} locale={locale} size="sm" />

        <div className="mt-1 flex items-center justify-between gap-2">
          <span className={cn("flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400")}>
            <Zap className="h-3 w-3" />
            {dict.card.instantDelivery}
          </span>
        </div>

        <span className="mt-2 inline-flex h-9 w-full items-center justify-center rounded-full bg-dara-blue text-xs font-semibold text-white transition-colors group-hover:bg-[#0247CC] sm:text-sm">
          {dict.card.buyNow}
        </span>
      </div>
    </Link>
  );
}
