"use client";

import { useState } from "react";
import { QrCode, Copy, Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import { formatAED } from "@/lib/utils";
import { getGiftCardById } from "@/data/products";
import { getBrandById } from "@/data/brands";
import type { CompletedOrderLine } from "@/lib/order-store";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/dictionaries";

export function DigitalGiftCard({
  line,
  locale,
  dict,
}: {
  line: CompletedOrderLine;
  locale: Locale;
  dict: Dictionary;
}) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const card = getGiftCardById(line.giftCardId);
  const brand = card ? getBrandById(card.brandId) : undefined;
  if (!card) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(line.voucherCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      <div
        className="relative flex flex-col justify-between p-6 text-white sm:p-7"
        style={{ background: `linear-gradient(135deg, ${card.color} 0%, #16161E 140%)`, minHeight: 200 }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Image src="/images/dara-logo-mark.png" alt="Dara Digital" width={22} height={22} className="h-5 w-5" />
            <span className="text-xs font-bold tracking-wide">
              {locale === "ar" ? "دارا ديجيتال" : "DARA DIGITAL"}
            </span>
          </div>
          <span className="rounded-full bg-emerald-400/20 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
            {dict.giftCardView.active}
          </span>
        </div>
        <div>
          <p className="text-xs font-medium opacity-70">{brand?.name[locale]}</p>
          <p className="mt-1 text-lg font-bold sm:text-xl">{card.name[locale]}</p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight">{formatAED(line.amount, locale)}</p>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <p className="mb-1.5 text-xs font-semibold text-muted">{dict.giftCardView.voucherCode}</p>
        <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-dashed border-border bg-background px-4 py-3">
          <span className="font-mono text-sm font-bold tracking-wider text-foreground sm:text-base">
            {line.voucherCode}
          </span>
          <button
            onClick={handleCopy}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-dara-blue/10 px-3 py-1.5 text-xs font-semibold text-dara-blue transition-colors hover:bg-dara-blue/20"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? dict.giftCardView.copied : dict.giftCardView.copyCode}
          </button>
        </div>

        <button
          onClick={() => setShowQr((s) => !s)}
          className="mb-3 flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground hover:bg-background"
        >
          <span className="flex items-center gap-2">
            <QrCode className="h-4 w-4" />
            {dict.giftCardView.showQr}
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${showQr ? "rotate-180" : ""}`} />
        </button>
        {showQr && (
          <div className="mb-3 flex items-center justify-center rounded-xl border border-border bg-background p-6">
            <div
              className="grid h-32 w-32 grid-cols-8 grid-rows-8 gap-0.5 rounded-md bg-foreground p-2"
              aria-label="QR code placeholder"
            >
              {Array.from({ length: 64 }).map((_, i) => (
                <span
                  key={i}
                  className="rounded-[1px]"
                  style={{ backgroundColor: (i * 7) % 3 === 0 ? "var(--background)" : "transparent" }}
                />
              ))}
            </div>
          </div>
        )}

        <details className="rounded-xl border border-border px-4 py-3">
          <summary className="cursor-pointer list-none text-sm font-semibold text-foreground">
            {dict.giftCardView.howToRedeem}
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {locale === "ar"
              ? `توجه إلى موقع أو تطبيق ${brand?.name.ar} وأدخل الرمز أعلاه عند إتمام الدفع.`
              : `Head to the ${brand?.name.en} website or app and enter the code above at checkout.`}
          </p>
        </details>
      </div>
    </div>
  );
}
