import type { Metadata } from "next";
import "../globals.css";
import { LocaleSiteShell } from "@/components/layout/locale-site-shell";
import { i18n, type Locale } from "@/lib/i18n-config";
import { localizedHref } from "@/lib/locale-url";

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isAr = params.locale === "ar";
  const title = isAr
    ? "دارا ديجيتال | بطاقات الهدايا الرقمية في الإمارات"
    : "Dara Digital | Digital Gift Cards in the UAE";
  const description = isAr
    ? "اكتشف بطاقات الهدايا والـVouchers من أشهر العلامات التجارية، واستلمها رقمياً بسرعة وأمان."
    : "Discover digital gift cards and vouchers from popular brands and receive them instantly and securely.";

  return {
    title: { default: title, template: `%s | ${isAr ? "دارا ديجيتال" : "Dara Digital"}` },
    description,
    metadataBase: new URL("https://daradigital.ae"),
    alternates: {
      canonical: localizedHref(params.locale, "/"),
      languages: { ar: localizedHref("ar", "/"), en: localizedHref("en", "/") },
    },
    openGraph: {
      title,
      description,
      locale: isAr ? "ar_AE" : "en_AE",
      type: "website",
      siteName: "Dara Digital",
    },
    robots: { index: true, follow: true },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const { locale } = params;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body>
        <LocaleSiteShell locale={locale}>{children}</LocaleSiteShell>
      </body>
    </html>
  );
}
