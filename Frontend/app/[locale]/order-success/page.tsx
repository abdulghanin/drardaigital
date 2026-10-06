import { OrderSuccessView } from "@/components/orders/order-success-view";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return { title: dict.orderSuccess.title };
}

export default function OrderSuccessPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return <OrderSuccessView locale={params.locale} dict={dict} />;
}
