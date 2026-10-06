import { i18n, type Locale } from "./i18n-config";

export function localizedHref(locale: Locale, href: string): string {
  const hashIndex = href.indexOf("#");
  const beforeHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const queryIndex = beforeHash.indexOf("?");
  const pathname = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;
  const query = queryIndex >= 0 ? beforeHash.slice(queryIndex) : "";
  const segments = pathname.split("/").filter(Boolean);

  while (i18n.locales.includes(segments[0] as Locale)) {
    segments.shift();
  }

  const route = segments.length > 0 ? `/${locale}/${segments.join("/")}/` : `/${locale}/`;
  return `${route}${query}${hash}`;
}