import { OfferBanner } from "@/components/gift-cards/offer-banner";
import { getDictionary } from "@/lib/dictionaries";
import { fetchOffers } from "@/services/offers";
import type { Locale } from "@/lib/i18n-config";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return { title: dict.offers.title, description: dict.offers.subtitle };
}

export default async function OffersPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const offers = await fetchOffers();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-8 max-w-xl">
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{dict.offers.title}</h1>
        <p className="mt-2 text-muted">{dict.offers.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <OfferBanner key={offer.id} offer={offer} locale={locale} dict={dict} />
        ))}
      </div>
    </div>
  );
}
