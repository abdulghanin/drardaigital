import { brands, getBrandBySlug } from "@/data/brands";
import type { Brand } from "@/types";

export async function fetchBrands(): Promise<Brand[]> {
  return Promise.resolve(brands);
}

export async function fetchPopularBrands(): Promise<Brand[]> {
  return Promise.resolve(brands.filter((b) => b.popular));
}

export async function fetchBrandBySlug(slug: string): Promise<Brand | undefined> {
  return Promise.resolve(getBrandBySlug(slug));
}
