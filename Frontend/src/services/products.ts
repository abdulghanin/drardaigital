import { giftCards, getGiftCardBySlug, getFeaturedGiftCards, getGiftCardsByCategory, getGiftCardsByBrand } from "@/data/products";
import type { GiftCard } from "@/types";

/**
 * Service layer — currently backed by mock data.
 * Later, these functions will call the Laravel REST API instead.
 * UI components should only ever import from `@/services/*`, never from `@/data/*` directly.
 */
export async function fetchGiftCards(): Promise<GiftCard[]> {
  return Promise.resolve(giftCards);
}

export async function fetchGiftCardBySlug(slug: string): Promise<GiftCard | undefined> {
  return Promise.resolve(getGiftCardBySlug(slug));
}

export async function fetchFeaturedGiftCards(): Promise<GiftCard[]> {
  return Promise.resolve(getFeaturedGiftCards());
}

export async function fetchGiftCardsByCategory(categoryId: string): Promise<GiftCard[]> {
  return Promise.resolve(getGiftCardsByCategory(categoryId));
}

export async function fetchGiftCardsByBrand(brandId: string): Promise<GiftCard[]> {
  return Promise.resolve(getGiftCardsByBrand(brandId));
}
