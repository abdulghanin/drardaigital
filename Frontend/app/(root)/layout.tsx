import type { Metadata } from "next";
import "../globals.css";
import { LocaleSiteShell } from "@/components/layout/locale-site-shell";

export const metadata: Metadata = {
  title: "Dara Digital | Digital Gift Cards in the UAE",
  description: "Discover digital gift cards and vouchers from popular brands in the UAE.",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
        <LocaleSiteShell locale="en">{children}</LocaleSiteShell>
      </body>
    </html>
  );
}