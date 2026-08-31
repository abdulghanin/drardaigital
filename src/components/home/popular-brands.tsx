import { CategoryCard } from "@/components/gift-cards/category-card";
import { BrandsMarquee } from "./brands-marquee";
import { SectionHeader } from "./section-header";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { RevealItem } from "@/components/motion/reveal-item";
import { fetchPopularBrands } from "@/services/brands";
import type { Dictionary } from "@/lib/dictionaries";
import type { Category, Locale } from "@/types";

export async function PopularBrands({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const brands = await fetchPopularBrands();

  return (
    <section
      aria-labelledby="popular-brands-heading"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface">
        {/* Subtle premium background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-dara-gradient opacity-[0.025]"
        />

        {/* Soft decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 start-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-dara-blue/10 blur-3xl"
        />

        <div className="relative">
          {/* Section Header */}
          <div className="px-5 pt-7 sm:px-8 sm:pt-9 lg:px-10">
            <div id="popular-brands-heading">
              <SectionHeader
                title={dict.sections.popularBrands}
                locale={locale}
              />
            </div>
          </div>

          {/* Brands Showcase */}
          <Reveal>
            <div className="relative mt-6 px-4 pb-7 sm:px-8 sm:pb-9 lg:px-10">
              <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/70 px-3 py-5 sm:px-6 sm:py-6">
                {/* Start fade */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 start-0 z-10 w-10 bg-gradient-to-r from-background via-background/80 to-transparent sm:w-16"
                />

                {/* End fade */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 end-0 z-10 w-10 bg-gradient-to-l from-background via-background/80 to-transparent sm:w-16"
                />

                <BrandsMarquee
                  brands={brands}
                  locale={locale}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export async function CategoriesSection({
  locale,
  dict,
  categories,
}: {
  locale: Locale;
  dict: Dictionary;
  categories: Category[];
}) {
  return (
    <section
      aria-labelledby="categories-heading"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div
        className="mb-7 sm:mb-9"
        id="categories-heading"
      >
        <SectionHeader
          title={dict.sections.categories}
          locale={locale}
        />
      </div>

      <RevealGroup
        className="
          grid
          grid-cols-2
          gap-3
          sm:grid-cols-4
          sm:gap-4
          md:grid-cols-5
          lg:grid-cols-8
          xl:grid-cols-9
        "
      >
        {categories.map((category) => (
          <RevealItem
            key={category.id}
            className="h-full"
          >
            <div
              className="
                h-full
                rounded-2xl
                transition-all
                duration-300
                ease-out
                hover:-translate-y-1
                hover:shadow-md
                motion-reduce:transition-none
                motion-reduce:hover:translate-y-0
              "
            >
              <CategoryCard
                category={category}
                locale={locale}
              />
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}