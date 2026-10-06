import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types";
import { localizedHref } from "@/lib/locale-url";

export function Logo({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <Link href={localizedHref(locale, "/")} className={`flex items-center gap-2.0 shrink-0 ${className ?? ""}`}>
      <Image src="/images/dara-logo-mark.png" alt="Dara Digital" width={36} height={36} priority className="h-8 w-8 sm:h-9 sm:w-9" />
      <span className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
        {locale === "ar" ? "دارا ديجيتال" : "DARA DIGITAL"}
      </span>
    </Link>
  );
}
