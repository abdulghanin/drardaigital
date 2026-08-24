import { CheckoutFlow } from "@/components/checkout/checkout-flow";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return { title: dict.checkout.title };
}

export default function CheckoutPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = getDictionary(locale);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <h1 className="mb-6 font-display text-2xl font-bold text-foreground sm:text-3xl">{dict.checkout.title}</h1>
      <CheckoutFlow locale={locale} dict={dict} />
    </div>
  );
}
