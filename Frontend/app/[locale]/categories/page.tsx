import { CategoryCard } from "@/components/gift-cards/category-card";
import { RevealGroup } from "@/components/motion/reveal";
import { RevealItem } from "@/components/motion/reveal-item";
import { getDictionary } from "@/lib/dictionaries";
import { fetchCategories } from "@/services/categories";
import type { Locale } from "@/lib/i18n-config";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const isAr = params.locale === "ar";
  return {
    title: isAr ? "التصنيفات" : "Categories",
    description: isAr
      ? "تصفح بطاقات الهدايا حسب التصنيف على دارا ديجيتال."
      : "Browse digital gift cards by category on Dara Digital.",
  };
}

export default async function CategoriesPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const categories = await fetchCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{dict.sections.categories}</h1>
      </div>
      <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
        {categories.map((category) => (
          <RevealItem key={category.id}>
            <CategoryCard category={category} locale={locale} />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
