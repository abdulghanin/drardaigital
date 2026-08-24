import type { MetadataRoute } from "next";
import { giftCards } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://daradigital.ae";
  const staticPaths = ["", "/gift-cards", "/offers", "/business", "/cart"];
  const locales = ["ar", "en"];

  const staticEntries = locales.flatMap((locale) =>
    staticPaths.map((p) => ({ url: `${base}/${locale}${p}`, lastModified: new Date() }))
  );

  const productEntries = locales.flatMap((locale) =>
    giftCards.map((g) => ({ url: `${base}/${locale}/gift-cards/${g.slug}`, lastModified: new Date() }))
  );

  return [...staticEntries, ...productEntries];
}
