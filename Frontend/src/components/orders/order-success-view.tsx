"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { getCompletedOrder, type CompletedOrder } from "@/lib/order-store";
import { DigitalGiftCard } from "./digital-gift-card";
import { Button } from "@/components/ui/button";
import { formatAED } from "@/lib/utils";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/dictionaries";
import { localizedHref } from "@/lib/locale-url";

export function OrderSuccessView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [order, setOrder] = useState<CompletedOrder | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const o = getCompletedOrder();
    setOrder(o);
    if (!o) {
      const t = setTimeout(() => router.push(localizedHref(locale, "/")), 1200);
      return () => clearTimeout(t);
    }
  }, [locale, router]);

  if (order === undefined) return null;

  if (!order) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="text-sm text-muted">{dict.states.loading}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="h-9 w-9 text-emerald-500" />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{dict.orderSuccess.title}</h1>
        <p className="mt-2 text-muted">{dict.orderSuccess.subtitle}</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl border border-border bg-surface px-6 py-4 text-sm">
          <div>
            <span className="text-muted">{dict.orderSuccess.orderNumber}: </span>
            <span className="font-semibold text-foreground">{order.orderNumber}</span>
          </div>
          <div>
            <span className="text-muted">{dict.cart.total}: </span>
            <span className="font-semibold text-foreground">{formatAED(order.total, locale)}</span>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {dict.orderSuccess.deliveryStatus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {order.lines.map((line) => (
          <DigitalGiftCard key={line.id} line={line} locale={locale} dict={dict} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href={localizedHref(locale, "/")}>
          <Button size="lg" variant="outline">
            {dict.orderSuccess.backHome}
          </Button>
        </Link>
      </div>
    </div>
  );
}
