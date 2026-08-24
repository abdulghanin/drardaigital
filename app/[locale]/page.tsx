import { Hero } from "@/components/home/hero";
import { PopularBrands, CategoriesSection } from "@/components/home/popular-brands";
import { HowItWorks } from "@/components/home/how-it-works";
import { TrustSection } from "@/components/home/trust-section";
import { SectionHeader } from "@/components/home/section-header";
import { ProductGrid } from "@/components/gift-cards/product-grid";
import { OffersCarousel } from "@/components/home/offers-carousel";
import { Reveal } from "@/components/motion/reveal";
import { getDictionary } from "@/lib/dictionaries";
import { fetchFeaturedGiftCards } from "@/services/products";
import { fetchCategories } from "@/services/categories";
import { fetchOffers } from "@/services/offers";
import type { Locale } from "@/lib/i18n-config";

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const [featured, categories, offers] = await Promise.all([
    fetchFeaturedGiftCards(),
    fetchCategories(),
    fetchOffers(),
  ]);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <PopularBrands locale={locale} dict={dict} />
      <CategoriesSection locale={locale} dict={dict} categories={categories} />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Reveal>
          <SectionHeader
            title={dict.sections.featured}
            viewAllHref={`/${locale}/gift-cards`}
            viewAllLabel={dict.sections.viewAll}
            locale={locale}
          />
          <ProductGrid cards={featured} locale={locale} dict={dict} />
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Reveal>
          <SectionHeader
            title={dict.sections.offers}
            viewAllHref={`/${locale}/offers`}
            viewAllLabel={dict.sections.viewAll}
            locale={locale}
          />
          <OffersCarousel offers={offers} locale={locale} dict={dict} />
        </Reveal>
      </section>

      <HowItWorks locale={locale} dict={dict} />
      <TrustSection locale={locale} dict={dict} />
    </>
  );
}

