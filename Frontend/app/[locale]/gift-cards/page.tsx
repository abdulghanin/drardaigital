import { Suspense } from "react";
import { GiftCardsExplorer } from "@/components/gift-cards/gift-cards-explorer";
import { GiftCardGridSkeleton } from "@/components/ui/loading-skeleton";
import { getDictionary } from "@/lib/dictionaries";
import { fetchGiftCards } from "@/services/products";
import { fetchBrands } from "@/services/brands";
import { fetchCategories } from "@/services/categories";
import type { Locale } from "@/lib/i18n-config";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const isAr = params.locale === "ar";
  return {
    title: isAr ? "بطاقات الهدايا" : "Gift Cards",
    description: isAr
      ? "تصفح جميع بطاقات الهدايا والـVouchers الرقمية على دارا ديجيتال."
      : "Browse all digital gift cards and vouchers on Dara Digital.",
  };
}

export default async function GiftCardsPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const [cards, brands, categories] = await Promise.all([
    fetchGiftCards(),
    fetchBrands(),
    fetchCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{dict.nav.giftCards}</h1>
      </div>
      <Suspense fallback={<GiftCardGridSkeleton count={12} />}>
        <GiftCardsExplorer cards={cards} brands={brands} categories={categories} locale={locale} dict={dict} />
      </Suspense>
    </div>
  );
}
