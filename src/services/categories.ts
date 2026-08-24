import { categories, getCategoryBySlug } from "@/data/categories";
import type { Category } from "@/types";

export async function fetchCategories(): Promise<Category[]> {
  return Promise.resolve(categories);
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | undefined> {
  return Promise.resolve(getCategoryBySlug(slug));
}
