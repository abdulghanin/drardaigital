import { notFound } from "next/navigation";
import { Star, ShieldCheck, Zap, Clock } from "lucide-react";
import { PurchasePanel } from "@/components/gift-cards/purchase-panel";
import { ProductGrid } from "@/components/gift-cards/product-grid";
import { SectionHeader } from "@/components/home/section-header";
import { getDictionary } from "@/lib/dictionaries";
import { fetchGiftCardBySlug, fetchGiftCards, fetchGiftCardsByCategory } from "@/services/products";
import { fetchBrands } from "@/services/brands";
import type { Locale } from "@/lib/i18n-config";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const cards = await fetchGiftCards();
  return cards.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const card = await fetchGiftCardBySlug(params.slug);
  if (!card) return {};
  return {
    title: card.name[params.locale],
    description: card.description[params.locale],
  };
}

export default async function GiftCardDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const dict = getDictionary(locale);
  const card = await fetchGiftCardBySlug(slug);
  if (!card) notFound();

  const brands = await fetchBrands();
  const brand = brands.find((b) => b.id === card.brandId);
  const related = (await fetchGiftCardsByCategory(card.categoryId)).filter((g) => g.id !== card.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <span>{dict.nav.giftCards}</span>
        <span>/</span>
        <span className="text-foreground">{card.name[locale]}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div
            className="relative flex h-56 items-center justify-center overflow-hidden rounded-3xl shadow-card sm:h-72"
            style={{ background: `linear-gradient(135deg, ${card.color} 0%, #035AF7 130%)` }}
          >
            <span className="font-display text-5xl font-extrabold text-white/90 sm:text-6xl">{card.name.en[0]}</span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white"
              style={{ backgroundColor: brand?.logoColor }}
            >
              {brand?.name.en[0]}
            </span>
            <span className="text-sm font-medium text-muted">{brand?.name[locale]}</span>
            <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {card.rating}
              <span className="text-muted">({card.reviewCount})</span>
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">{card.name[locale]}</h1>
          <p className="mt-3 leading-relaxed text-muted">{card.description[locale]}</p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-border bg-surface p-3.5 text-center">
              <Zap className="mx-auto mb-1.5 h-4 w-4 text-dara-blue" />
              <p className="text-xs font-semibold text-foreground">{dict.card.instantDelivery}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-3.5 text-center">
              <ShieldCheck className="mx-auto mb-1.5 h-4 w-4 text-dara-blue" />
              <p className="text-xs font-semibold text-foreground">{locale === "ar" ? "بطاقة أصلية" : "Authentic"}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-3.5 text-center">
              <Clock className="mx-auto mb-1.5 h-4 w-4 text-dara-blue" />
              <p className="text-xs font-semibold text-foreground">{locale === "ar" ? "صالحة لسنة" : "Valid 1 Year"}</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <details className="group rounded-xl border border-border bg-surface p-4" open>
              <summary className="cursor-pointer list-none text-sm font-semibold text-foreground">
                {dict.product.redemption}
              </summary>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {locale === "ar"
                  ? `بعد إتمام عملية الشراء، ستستلم رمز البطاقة عبر البريد الإلكتروني فوراً. توجه إلى موقع أو تطبيق ${brand?.name.ar} وأدخل الرمز عند الدفع.`
                  : `After purchase, you'll receive your voucher code instantly by email. Head to the ${brand?.name.en} website or app and enter the code at checkout.`}
              </p>
            </details>
            <details className="group rounded-xl border border-border bg-surface p-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-foreground">
                {dict.product.terms}
              </summary>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {locale === "ar"
                  ? "البطاقة غير قابلة للاسترجاع أو الاستبدال نقداً. صالحة للاستخدام داخل دولة الإمارات العربية المتحدة فقط ما لم يُذكر خلاف ذلك."
                  : "This gift card is non-refundable and cannot be exchanged for cash. Valid for use within the UAE unless stated otherwise."}
              </p>
            </details>
            <details className="group rounded-xl border border-border bg-surface p-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-foreground">
                {dict.product.expiry}
              </summary>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {locale === "ar" ? "تنتهي صلاحية البطاقة بعد 12 شهراً من تاريخ الشراء." : "This gift card expires 12 months from the date of purchase."}
              </p>
            </details>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <PurchasePanel card={card} locale={locale} dict={dict} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeader title={dict.product.relatedCards} locale={locale} />
          <ProductGrid cards={related} locale={locale} dict={dict} />
        </section>
      )}
    </div>
  );
}
