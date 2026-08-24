import { Gift, Users, Heart, Repeat, Package, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return { title: dict.business.headline, description: dict.business.sub };
}

export default function BusinessPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  const solutions = [
    { icon: Gift, title: dict.business.corporateGifts, desc: dict.business.corporateGiftsDesc },
    { icon: Users, title: dict.business.employeeRewards, desc: dict.business.employeeRewardsDesc },
    { icon: Heart, title: dict.business.customerRewards, desc: dict.business.customerRewardsDesc },
    { icon: Repeat, title: dict.business.loyaltyPrograms, desc: dict.business.loyaltyProgramsDesc },
    { icon: Package, title: dict.business.bulkGiftCards, desc: dict.business.bulkGiftCardsDesc },
  ];

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-dara-gradient opacity-[0.07] dark:opacity-[0.16]" />
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <span className="mb-5 inline-flex items-center rounded-full bg-dara-blue/10 px-3.5 py-1.5 text-xs font-semibold text-dara-blue">
            Dara Digital {locale === "ar" ? "للشركات" : "for Business"}
          </span>
          <h1 className="font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {dict.business.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{dict.business.sub}</p>
          <Button size="lg" className="mt-8 gap-2">
            {dict.business.contactUs}
            <Arrow className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-card ${
                i === solutions.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-dara-blue/10 text-dara-blue">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mb-2 text-base font-bold text-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
            {locale === "ar" ? "جاهزون لمكافأة فريقك أو عملائك؟" : "Ready to reward your team or customers?"}
          </h2>
          <Button size="lg">{dict.business.contactUs}</Button>
        </div>
      </section>
    </div>
  );
}
