import type { MetadataRoute } from "next";
import { giftCards } from "@/data/products";
import { i18n } from "@/lib/i18n-config";
import { localizedHref } from "@/lib/locale-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://daradigital.ae";
  const staticPaths = ["/", "/business", "/cart", "/categories", "/checkout", "/gift-cards", "/offers", "/order-success"];

  const staticEntries = i18n.locales.flatMap((locale) =>
    staticPaths.map((path) => ({ url: `${base}${localizedHref(locale, path)}`, lastModified: new Date() }))
  );

  const productEntries = i18n.locales.flatMap((locale) =>
    giftCards.map((card) => ({ url: `${base}${localizedHref(locale, `/gift-cards/${card.slug}`)}`, lastModified: new Date() }))
  );

  return [{ url: `${base}/`, lastModified: new Date() }, ...staticEntries, ...productEntries];
}
