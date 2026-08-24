import { GiftCardCard } from "./gift-card-card";
import { EmptyState } from "@/components/ui/empty-state";
import { PackageSearch } from "lucide-react";
import type { GiftCard, Locale } from "@/types";
import type { Dictionary } from "@/lib/dictionaries";

export function ProductGrid({
  cards,
  locale,
  dict,
}: {
  cards: GiftCard[];
  locale: Locale;
  dict: Dictionary;
}) {
  if (cards.length === 0) {
    return (
      <EmptyState
        icon={<PackageSearch className="h-10 w-10" />}
        title={dict.states.noResults}
        description={dict.states.noResultsDesc}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <GiftCardCard key={card.id} card={card} locale={locale} dict={dict} />
      ))}
    </div>
  );
}
