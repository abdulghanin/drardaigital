import type { CSSProperties, ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";

const LATIN_DISPLAY_STACK =
  "'Sora', 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
const LATIN_BODY_STACK =
  "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
const ARABIC_STACK =
  "'Tajawal', 'Segoe UI', 'Noto Sans Arabic', 'Dubai', ui-sans-serif, system-ui, sans-serif";

export function LocaleSiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = getDictionary(locale);

  return (
    <ThemeProvider>
      <CartProvider>
        <div
          className="min-h-screen bg-background font-body text-foreground antialiased"
          style={
            {
              "--font-display": locale === "ar" ? ARABIC_STACK : LATIN_DISPLAY_STACK,
              "--font-body": locale === "ar" ? ARABIC_STACK : LATIN_BODY_STACK,
            } as CSSProperties
          }
        >
          <div className="flex min-h-screen flex-col">
            <Header locale={locale} dict={dict} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} dict={dict} />
          </div>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}