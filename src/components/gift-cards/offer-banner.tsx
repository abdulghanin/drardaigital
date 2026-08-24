import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getGiftCardById } from "@/data/products";
import type { Offer, Locale } from "@/types";
import type { Dictionary } from "@/lib/dictionaries";

export function OfferBanner({ offer, locale, dict }: { offer: Offer; locale: Locale; dict: Dictionary }) {
  const card = getGiftCardById(offer.giftCardId);
  if (!card) return null;

  return (
    <Link
      href={`/${locale}/gift-cards/${card.slug}`}
      className="group relative flex min-w-[260px] flex-1 flex-col justify-between overflow-hidden rounded-2xl p-5 text-white shadow-card transition-transform hover:-translate-y-1 sm:min-w-[300px] sm:p-6"
      style={{ background: `linear-gradient(135deg, ${offer.color} 0%, #16161E 140%)` }}
    >
      <div className="flex items-start justify-between">
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-sm">
          {dict.offers.save} {offer.discountPercent}%
        </span>
        <ArrowUpRight className="h-5 w-5 opacity-70 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 rtl:group-hover:-translate-x-1" />
      </div>
      <div className="mt-8">
        <p className="text-lg font-bold sm:text-xl">{offer.title[locale]}</p>
        <p className="mt-1 text-sm text-white/80">{card.name[locale]}</p>
      </div>
    </Link>
  );
}
