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
      <div className="mb-6 sm:mb-8" id="popular-brands-heading">
        <SectionHeader title={dict.sections.popularBrands} locale={locale} />
      </div>

      <Reveal>
        <div className="relative border-y border-border/70 py-5 sm:py-6">
          <BrandsMarquee brands={brands} locale={locale} />
        </div>
      </Reveal>
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