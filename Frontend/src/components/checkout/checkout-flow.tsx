"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, CreditCard, Gift, User } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { saveCompletedOrder } from "@/lib/order-store";
import { localizedHref } from "@/lib/locale-url";
import { formatAED, cn } from "@/lib/utils";
import { getGiftCardById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ShoppingCart } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/dictionaries";

type Step = 1 | 2 | 3;

export function CheckoutFlow({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { lines, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);

  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [gift, setGift] = useState({ recipientEmail: "", message: "" });

  const total = useMemo(
    () => lines.reduce((sum, l) => sum + l.amount * l.quantity, 0),
    [lines]
  );

  const steps = [
    { n: 1, label: dict.checkout.customerInfo, icon: User },
    { n: 2, label: dict.checkout.giftInfo, icon: Gift },
    { n: 3, label: dict.checkout.payment, icon: CreditCard },
  ];

  const canProceedStep1 = customer.name.trim() && customer.email.trim();
  const canProceedStep2 = gift.recipientEmail.trim();

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  if (hydrated && lines.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingCart className="h-10 w-10" />}
        title={dict.cart.empty}
        description={dict.cart.emptyDesc}
        action={
          <Link href={localizedHref(locale, "/gift-cards")}>
            <Button className="mt-2">{dict.cart.startShopping}</Button>
          </Link>
        }
      />
    );
  }

  const handlePlaceDemoOrder = () => {
    saveCompletedOrder({ lines, total, customerName: customer.name, customerEmail: customer.email });
    clearCart();
    router.push(localizedHref(locale, "/order-success"));
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="mb-8 flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s.n} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors",
                  step >= s.n ? "border-dara-blue bg-dara-blue text-white" : "border-border text-muted"
                )}
              >
                {step > s.n ? <Check className="h-4 w-4" /> : s.n}
              </div>
              <span className={cn("hidden text-xs font-semibold sm:inline", step >= s.n ? "text-foreground" : "text-muted")}>
                {s.label}
              </span>
              {i < steps.length - 1 && <div className={cn("h-px flex-1", step > s.n ? "bg-dara-blue" : "bg-border")} />}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          {step === 1 && (
            <div className="space-y-4">
              <Field label={dict.checkout.fullName}>
                <input
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm focus:border-dara-blue focus:outline-none"
                />
              </Field>
              <Field label={dict.checkout.email}>
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm focus:border-dara-blue focus:outline-none"
                />
              </Field>
              <Field label={dict.checkout.phone}>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="+971 5X XXX XXXX"
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm focus:border-dara-blue focus:outline-none"
                />
              </Field>
              <Button className="mt-2 w-full" disabled={!canProceedStep1} onClick={() => setStep(2)}>
                {dict.checkout.next}
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Field label={dict.checkout.recipientEmail}>
                <input
                  type="email"
                  value={gift.recipientEmail}
                  onChange={(e) => setGift({ ...gift, recipientEmail: e.target.value })}
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm focus:border-dara-blue focus:outline-none"
                />
              </Field>
              <Field label={dict.checkout.giftMessage}>
                <textarea
                  value={gift.message}
                  onChange={(e) => setGift({ ...gift, message: e.target.value })}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-dara-blue focus:outline-none"
                />
              </Field>
              <div className="flex gap-2.5">
                <Button variant="outline" className="w-1/3" onClick={() => setStep(1)}>
                  {dict.checkout.back}
                </Button>
                <Button className="flex-1" disabled={!canProceedStep2} onClick={() => setStep(3)}>
                  {dict.checkout.next}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-dara-blue/20 bg-dara-blue/5 p-4">
                <h3 className="text-sm font-semibold text-foreground">{dict.checkout.demoPaymentTitle}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{dict.checkout.demoPaymentNotice}</p>
              </div>
              <Button type="button" className="w-full" onClick={handlePlaceDemoOrder}>
                {dict.checkout.completeDemoOrder}
              </Button>
              <div className="flex gap-2.5">
                <Button variant="outline" className="w-1/3" onClick={() => setStep(2)}>
                  {dict.checkout.back}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-fit rounded-2xl border border-border bg-surface p-5">
        <h3 className="mb-4 text-base font-bold text-foreground">{dict.checkout.orderSummary}</h3>
        <div className="max-h-72 space-y-3 overflow-y-auto pe-1">
          {lines.map((l) => {
            const card = getGiftCardById(l.giftCardId);
            if (!card) return null;
            return (
              <div key={l.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate text-foreground">
                  {card.name[locale]} × {l.quantity}
                </span>
                <span className="shrink-0 font-semibold text-foreground">{formatAED(l.amount * l.quantity, locale)}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-between border-t border-border pt-3 text-base font-bold text-foreground">
          <span>{dict.cart.total}</span>
          <span>{formatAED(total, locale)}</span>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-foreground">{label}</span>
      {children}
    </label>
  );
}
