"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatAED, cn } from "@/lib/utils";
import type { GiftCard, Locale } from "@/types";
import type { Dictionary } from "@/lib/dictionaries";
import { Button } from "@/components/ui/button";

export function PurchasePanel({
  card,
  locale,
  dict,
}: {
  card: GiftCard;
  locale: Locale;
  dict: Dictionary;
}) {
  const [amount, setAmount] = useState<number>(card.denominations[0]);
  const [customAmount, setCustomAmount] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addLine } = useCart();
  const router = useRouter();

  const selectedAmount = useCustom ? Number(customAmount) || 0 : amount;
  const disabled = card.availability === "out_of_stock" || selectedAmount <= 0;

  const handleAdd = () => {
    addLine({ giftCardId: card.id, amount: selectedAmount, quantity });
  };

  const handleBuyNow = () => {
    handleAdd();
    router.push(`/${locale}/checkout`);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <p className="mb-3 text-sm font-semibold text-foreground">{dict.product.denominations}</p>
      <div className="grid grid-cols-3 gap-2.5">
        {card.denominations.map((d) => (
          <button
            key={d}
            onClick={() => {
              setAmount(d);
              setUseCustom(false);
            }}
            className={cn(
              "rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors",
              !useCustom && amount === d
                ? "border-dara-blue bg-dara-blue/10 text-dara-blue"
                : "border-border text-foreground hover:border-dara-blue/40"
            )}
          >
            {formatAED(d, locale)}
          </button>
        ))}
        <button
          onClick={() => setUseCustom(true)}
          className={cn(
            "rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors",
            useCustom ? "border-dara-blue bg-dara-blue/10 text-dara-blue" : "border-border text-foreground hover:border-dara-blue/40"
          )}
        >
          {dict.product.customAmount}
        </button>
      </div>

      {useCustom && (
        <div className="mt-3">
          <input
            type="number"
            min={card.priceMin}
            max={card.priceMax}
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder={`${card.priceMin} - ${card.priceMax}`}
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm focus:border-dara-blue focus:outline-none"
          />
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">{dict.product.quantity}</p>
        <div className="flex items-center gap-3 rounded-full border border-border px-2 py-1">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-background"
            aria-label="decrease"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-5 text-center text-sm font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-background"
            aria-label="increase"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm text-muted">{dict.cart.total}</span>
        <span className="text-xl font-bold text-foreground">{formatAED(selectedAmount * quantity, locale)}</span>
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        <Button size="lg" className="w-full" disabled={disabled} onClick={handleBuyNow}>
          {dict.product.buyNow}
        </Button>
        <Button size="lg" variant="outline" className="w-full" disabled={disabled} onClick={handleAdd}>
          {dict.product.addToCart}
        </Button>
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
        <Check className="h-3.5 w-3.5" />
        {dict.card.instantDelivery}
      </div>
    </div>
  );
}
