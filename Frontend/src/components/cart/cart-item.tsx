"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { getGiftCardById } from "@/data/products";
import { getBrandById } from "@/data/brands";
import { formatAED } from "@/lib/utils";
import type { CartLine, Locale } from "@/types";
import type { Dictionary } from "@/lib/dictionaries";

export function CartItem({ line, locale, dict }: { line: CartLine; locale: Locale; dict: Dictionary }) {
  const { removeLine, updateQuantity } = useCart();
  const card = getGiftCardById(line.giftCardId);
  if (!card) return null;
  const brand = getBrandById(card.brandId);

  return (
    <div className="flex items-center gap-4 border-b border-border py-5 last:border-b-0">
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white sm:h-20 sm:w-20"
        style={{ background: `linear-gradient(135deg, ${card.color}, #035AF7)` }}
      >
        {card.name.en[0]}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground sm:text-base">{card.name[locale]}</p>
        <p className="text-xs text-muted">{brand?.name[locale]}</p>
        <p className="mt-1 text-sm font-medium text-foreground">{formatAED(line.amount, locale)}</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => removeLine(line.id)}
          aria-label={dict.cart.remove}
          className="text-muted transition-colors hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 rounded-full border border-border px-2 py-1">
          <button
            onClick={() => updateQuantity(line.id, line.quantity - 1)}
            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-background"
            aria-label="decrease"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="w-4 text-center text-xs font-semibold">{line.quantity}</span>
          <button
            onClick={() => updateQuantity(line.id, line.quantity + 1)}
            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-background"
            aria-label="increase"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>

      <p className="hidden w-20 text-end text-sm font-bold text-foreground sm:block">
        {formatAED(line.amount * line.quantity, locale)}
      </p>
    </div>
  );
}
