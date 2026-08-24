import { CategoryCard } from "@/components/gift-cards/category-card";
import { BrandsMarquee } from "./brands-marquee";
import { SectionHeader } from "./section-header";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { RevealItem } from "@/components/motion/reveal-item";
import { fetchPopularBrands } from "@/services/brands";
import type { Dictionary } from "@/lib/dictionaries";
import type { Category, Locale } from "@/types";

export async function PopularBrands({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const brands = await fetchPopularBrands();
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <SectionHeader title={dict.sections.popularBrands} locale={locale} />
      <Reveal>
        <BrandsMarquee brands={brands} locale={locale} />
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
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <SectionHeader title={dict.sections.categories} locale={locale} />
      <RevealGroup className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-9">
        {categories.map((c) => (
          <RevealItem key={c.id}>
            <CategoryCard category={c} locale={locale} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
