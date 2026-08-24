import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getDictionary } from "@/lib/dictionaries";
import { i18n, type Locale } from "@/lib/i18n-config";
import { cn } from "@/lib/utils";

/**
 * Font strategy: system font stacks (no external network fetch required at
 * build time). To use custom Google Fonts (Sora / Plus Jakarta Sans / Tajawal)
 * in an environment with internet access, swap these CSS variables for
 * `next/font/google` imports — the rest of the app already reads from
 * `--font-display` / `--font-body` so no other files need to change.
 */
const LATIN_DISPLAY_STACK =
  "'Sora', 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
const LATIN_BODY_STACK =
  "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
const ARABIC_STACK =
  "'Tajawal', 'Segoe UI', 'Noto Sans Arabic', 'Dubai', ui-sans-serif, system-ui, sans-serif";

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
      canonical: `/${params.locale}`,
      languages: { ar: "/ar", en: "/en" },
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
  const dict = getDictionary(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={cn("min-h-screen bg-background font-body text-foreground antialiased")}
        style={
          {
            "--font-display": locale === "ar" ? ARABIC_STACK : LATIN_DISPLAY_STACK,
            "--font-body": locale === "ar" ? ARABIC_STACK : LATIN_BODY_STACK,
          } as React.CSSProperties
        }
      >
        <ThemeProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Header locale={locale} dict={dict} />
              <main className="flex-1">{children}</main>
              <Footer locale={locale} dict={dict} />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
