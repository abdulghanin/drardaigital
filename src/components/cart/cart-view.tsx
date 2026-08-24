"use client";

import Link from "next/link";
import { ShoppingCart, ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { CartItem } from "./cart-item";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { formatAED } from "@/lib/utils";
import { getGiftCardById } from "@/data/products";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/dictionaries";

export function CartView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { lines } = useCart();
  const Arrow = locale === "ar" ? ArrowRight : ArrowLeft;

  const subtotal = lines.reduce((sum, l) => sum + l.amount * l.quantity, 0);
  const discount = lines.reduce((sum, l) => {
    const card = getGiftCardById(l.giftCardId);
    if (!card?.discountPercent) return sum;
    return sum + (l.amount * l.quantity * card.discountPercent) / 100;
  }, 0);
  const total = subtotal - discount;

  if (lines.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingCart className="h-10 w-10" />}
        title={dict.cart.empty}
        description={dict.cart.emptyDesc}
        action={
          <Link href={`/${locale}/gift-cards`}>
            <Button className="mt-2">{dict.cart.startShopping}</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
      <div className="rounded-2xl border border-border bg-surface px-5">
        {lines.map((line) => (
          <CartItem key={line.id} line={line} locale={locale} dict={dict} />
        ))}
      </div>

      <div className="h-fit rounded-2xl border border-border bg-surface p-5">
        <h3 className="mb-4 text-base font-bold text-foreground">{dict.checkout.orderSummary}</h3>
        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between text-muted">
            <span>{dict.cart.subtotal}</span>
            <span className="text-foreground">{formatAED(subtotal, locale)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-muted">
              <span>{dict.cart.discount}</span>
              <span className="text-emerald-600 dark:text-emerald-400">-{formatAED(discount, locale)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-border pt-2.5 text-base font-bold text-foreground">
            <span>{dict.cart.total}</span>
            <span>{formatAED(total, locale)}</span>
          </div>
        </div>
        <Link href={`/${locale}/checkout`}>
          <Button size="lg" className="mt-5 w-full gap-2">
            {dict.cart.checkout}
            <Arrow className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
